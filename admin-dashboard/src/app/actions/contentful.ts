"use server";

import { getEnvironment } from "@/lib/contentful";
import { revalidatePath } from "next/cache";

export async function getEntries(contentType: string) {
    const env = await getEnvironment();
    const entries = await env.getEntries({ content_type: contentType });
    return entries.items.map((item: any) => ({
        id: item.sys.id,
        ...item.fields,
        sys: item.sys,
    }));
}

export async function getEntry(id: string) {
    const env = await getEnvironment();
    return await env.getEntry(id);
}

export async function deleteEntry(id: string, pathToRevalidate: string) {
    const env = await getEnvironment();
    try {
        let entry = await env.getEntry(id);
        if (entry.isPublished()) {
            entry = await entry.unpublish();
        }
        await entry.delete();
        revalidatePath(pathToRevalidate);
        return { success: true };
    } catch (e: any) {
        console.error("Delete Error", e);
        let errorMsg = "حدث خطأ غير معروف في الحذف";
        if (e.message) {
            try {
                const parsed = JSON.parse(e.message);
                if (parsed.message) errorMsg = parsed.message;
            } catch {
                errorMsg = e.message;
            }
        }
        return { error: errorMsg };
    }
}

export async function togglePublish(id: string, isPublished: boolean, pathToRevalidate: string) {
    const env = await getEnvironment();
    try {
        let entry = await env.getEntry(id);
        if (isPublished) {
            await entry.unpublish();
        } else {
            // Auto-fill missing locales to prevent validation errors on older entries
            let needsUpdate = false;
            for (const key in entry.fields) {
                const field = entry.fields[key];
                if (field['ar'] !== undefined && field['en-US'] === undefined) {
                    field['en-US'] = field['ar'];
                    needsUpdate = true;
                } else if (field['en-US'] !== undefined && field['ar'] === undefined) {
                    field['ar'] = field['en-US'];
                    needsUpdate = true;
                }
            }
            if (needsUpdate) {
                entry = await entry.update();
            }
            await entry.publish();
        }
        revalidatePath(pathToRevalidate);
        return { success: true };
    } catch (e: any) {
        console.error("Publish Error:", e);
        let errorMsg = "حدث خطأ غير معروف في النشر";
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
