"use client";

import { useTransition } from "react";
import { FilePlus2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadAsset } from "@/app/actions/assets";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function AssetUpload() {
    const [isPending, startTransition] = useTransition();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("file", file);

                toast.info("جاري الرفع والمعالجة، يرجى الانتظار...");
                const result = await uploadAsset(formData);

                if (result.error) {
                    toast.error("خطأ في الرفع", { description: result.error });
                } else {
                    toast.success("تم الرفع والنشر بنجاح");
                }
            } catch (err: unknown) {
                console.error("Upload error caught:", err);
                const errorMessage = err instanceof Error ? err.message : "فشل الرفع بسبب خطأ في الخادم";
                toast.error("حدث خطأ غير متوقع", { description: errorMessage });
            } finally {
                // Reset input
                e.target.value = '';
            }
        });
    };

    return (
        <div className="flex items-center gap-4">
            <Input
                type="file"
                id="asset-upload"
                className="hidden"
                onChange={handleUpload}
                accept="image/*,video/*,application/pdf"
                disabled={isPending}
            />
            <label htmlFor="asset-upload">
                <Button asChild disabled={isPending} className="cursor-pointer">
                    <span>
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 ml-2 animate-spin" />
                        ) : (
                            <FilePlus2 className="mr-2 h-4 w-4 ml-2" />
                        )}
                        رفع ملف جديد
                    </span>
                </Button>
            </label>
        </div>
    );
}
