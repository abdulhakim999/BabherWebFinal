"use server";

import { getEnvironment } from "@/lib/contentful";
import { revalidatePath } from "next/cache";

export async function getAssetsList() {
    const env = await getEnvironment();
    const assets = await env.getAssets({ order: "-sys.updatedAt" as any, limit: 50 });
    return assets.items.map((item: any) => ({
        id: item.sys.id,
        fields: item.fields,
        sys: item.sys,
    }));
}

export async function uploadAsset(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("لم يتم تحديد ملف");

        const env = await getEnvironment();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const createI18nField = (val: any) => ({ 'ar': val, 'en-US': val });

        let asset = await env.createAssetFromFiles({
            fields: {
                title: createI18nField(file.name),
                description: createI18nField("تم الرفع من لوحة التحكم"),
                file: createI18nField({
                    contentType: file.type,
                    fileName: file.name,
                    file: buffer as any, // contentful-management accepts Buffer
                }),
            },
        });

        // Process asset
        asset = await asset.processForAllLocales();

        // Publish asset
        asset = await env.getAsset(asset.sys.id);
        asset = await asset.publish();

        revalidatePath("/dashboard/media");
        return { success: true, id: asset.sys.id };
    } catch (e: any) {
        console.error("Upload Asset Error:", e);
        let errorMsg = "حدث خطأ غير معروف في الرفع";
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

export async function deleteAsset(id: string) {
    const env = await getEnvironment();
    try {
        let asset = await env.getAsset(id);
        if (asset.isPublished()) {
            asset = await asset.unpublish();
        }
        await asset.delete();
        revalidatePath("/dashboard/media");
        return { success: true };
    } catch (e: any) {
        console.error("Delete Asset Error", e);
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
