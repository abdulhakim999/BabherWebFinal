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
        const entry = await env.getEntry(id);
        if (entry.isPublished()) {
            await entry.unpublish();
        }
        await entry.delete();
        revalidatePath(pathToRevalidate);
        return { success: true };
    } catch (e: any) {
        console.error("Delete Error", e.message);
        return { error: e.message };
    }
}

export async function togglePublish(id: string, isPublished: boolean, pathToRevalidate: string) {
    const env = await getEnvironment();
    try {
        const entry = await env.getEntry(id);
        if (isPublished) {
            await entry.unpublish();
        } else {
            await entry.publish();
        }
        revalidatePath(pathToRevalidate);
        return { success: true };
    } catch (e: any) {
        console.error("Publish Error", e.message);
        return { error: e.message };
    }
}
