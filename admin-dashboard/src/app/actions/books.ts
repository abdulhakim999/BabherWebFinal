"use server";

import { getEnvironment } from "@/lib/contentful";
import { revalidatePath } from "next/cache";

export async function saveBook(id: string | undefined, data: any) {
    const env = await getEnvironment();
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    const fields: Record<string, any> = {
        title: { [locale]: data.title },
    };

    if (data.description) fields.description = { [locale]: data.description };
    if (data.tag) fields.tag = { [locale]: data.tag };
    if (data.date) fields.date = { [locale]: new Date(data.date).toISOString() };
    if (data.bookUrl) fields.bookUrl = { [locale]: data.bookUrl };
    if (data.image) fields.image = { [locale]: { sys: { type: "Link", linkType: "Asset", id: data.image } } };

    try {
        let entry;
        if (id) {
            entry = await env.getEntry(id);
            entry.fields = { ...entry.fields, ...fields };
            entry = await entry.update();
        } else {
            entry = await env.createEntry("books", { fields });
        }
        await entry.publish();
        revalidatePath("/dashboard/books");
        return { success: true, id: entry.sys.id };
    } catch (e: any) {
        console.error("Save Book Error:", e);
        return { error: e.message };
    }
}
