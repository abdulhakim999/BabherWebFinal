"use server";

import { getEnvironment } from "@/lib/contentful";
import { revalidatePath } from "next/cache";

export async function saveCourse(id: string | undefined, data: any) {
    const env = await getEnvironment();
    const createI18nField = (val: any) => ({ 'ar': val, 'en-US': val });

    const fields: Record<string, any> = {
        title: createI18nField(data.title),
    };

    if (data.description) fields.description = createI18nField(data.description);
    if (data.tag) fields.tag = createI18nField(data.tag);
    if (data.date) fields.date = createI18nField(new Date(data.date).toISOString());
    if (data.videoUrl) fields.videoUrl = createI18nField(data.videoUrl);
    if (data.image) fields.image = createI18nField({ sys: { type: "Link", linkType: "Asset", id: data.image } });

    try {
        let entry;
        if (id) {
            entry = await env.getEntry(id);
            entry.fields = { ...entry.fields, ...fields };
            entry = await entry.update();
        } else {
            entry = await env.createEntry("course", { fields });
        }
        await entry.publish();
        revalidatePath("/dashboard/courses");
        return { success: true, id: entry.sys.id };
    } catch (e: any) {
        console.error("Save Course Error:", e);
        let errorMsg = "حدث خطأ غير معروف";
        if (e.message) {
            try {
                const parsed = JSON.parse(e.message);
                if (parsed.message) errorMsg = parsed.message;
                if (parsed.details && parsed.details.errors) {
                    errorMsg += " - " + parsed.details.errors.map((err: any) => err.details || err.name).join(", ");
                }
            } catch {
                errorMsg = e.message;
            }
        }
        return { error: errorMsg };
    }
}
