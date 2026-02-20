"use server";

import { getEnvironment } from "@/lib/contentful";
import { revalidatePath } from "next/cache";

export async function saveLecture(id: string | undefined, data: any) {
    const env = await getEnvironment();
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    const fields: Record<string, any> = {
        title: { [locale]: data.title },
    };

    if (data.description) fields.description = { [locale]: data.description };
    if (data.tag) fields.tag = { [locale]: data.tag };
    if (data.date) fields.date = { [locale]: new Date(data.date).toISOString() };
    if (data.videoURL) fields.videoURL = { [locale]: data.videoURL };
    if (data.image1) fields.image1 = { [locale]: { sys: { type: "Link", linkType: "Asset", id: data.image1 } } };

    try {
        let entry;
        if (id) {
            entry = await env.getEntry(id);
            entry.fields = { ...entry.fields, ...fields };
            await entry.update();
        } else {
            entry = await env.createEntry("lectures", { fields });
        }
        revalidatePath("/dashboard/lectures");
        return { success: true, id: entry.sys.id };
    } catch (e: any) {
        console.error("Save Lecture Error:", e);
        return { error: e.message };
    }
}
