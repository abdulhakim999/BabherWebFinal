"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveLecture } from "@/app/actions/lectures";
import { toast } from "sonner";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { AssetPicker } from "@/components/asset-picker";

const lectureSchema = z.object({
    title: z.string().min(1, "العنوان مطلوب"),
    description: z.string().optional(),
    tag: z.string().optional(),
    date: z.string().optional(),
    videoUrl: z.string().url("رابط غير صحيح").or(z.literal("")).optional(),
    image1: z.string().optional(),
});

type LectureFormValues = z.infer<typeof lectureSchema>;

export function LectureForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const defaultValues: LectureFormValues = {
        title: initialData?.title || "",
        description: initialData?.description || "",
        tag: initialData?.tag || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : "",
        videoUrl: initialData?.videoUrl || "",
        image1: initialData?.image1 || "",
    };

    const form = useForm<LectureFormValues>({
        resolver: zodResolver(lectureSchema),
        defaultValues,
    });

    const onSubmit = (values: LectureFormValues) => {
        startTransition(async () => {
            const result = await saveLecture(initialData?.id, values);
            if (result.error) {
                toast.error("خطأ في الحفظ", { description: result.error });
            } else {
                toast.success(initialData?.id ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح");
                router.push("/dashboard/lectures");
                router.refresh();
            }
        });
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/lectures">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-bold md:text-2xl">
                    {initialData?.id ? "تعديل المحاضرة" : "إضافة محاضرة جديدة"}
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 border rounded-lg">
                <div className="space-y-2">
                    <Label htmlFor="title">العنوان *</Label>
                    <Input id="title" {...form.register("title")} disabled={isPending} />
                    {form.formState.errors.title && (
                        <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea id="description" {...form.register("description")} disabled={isPending} rows={5} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="tag">التصنيف (Tag)</Label>
                        <Input id="tag" {...form.register("tag")} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">التاريخ والوقت</Label>
                        <Input id="date" type="datetime-local" {...form.register("date")} disabled={isPending} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="videoUrl">رابط الفيديو (URL)</Label>
                    <Input id="videoUrl" type="url" {...form.register("videoUrl")} disabled={isPending} placeholder="https://..." dir="ltr" />
                    {form.formState.errors.videoUrl && (
                        <p className="text-sm text-destructive">{form.formState.errors.videoUrl.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>صورة المحاضرة</Label>
                    <AssetPicker
                        value={form.watch("image1")}
                        onChange={(val) => form.setValue("image1", val)}
                        label="اختر صورة للمحاضرة"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "جاري الحفظ..." : (
                            <>
                                <Save className="mr-2 h-4 w-4 ml-2" />
                                حفظ
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
