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
import { saveBook } from "@/app/actions/books";
import { toast } from "sonner";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { AssetPicker } from "@/components/asset-picker";

const bookSchema = z.object({
    title: z.string().min(1, "العنوان مطلوب"),
    description: z.string().optional(),
    tag: z.string().optional(),
    date: z.string().optional(),
    bookURL: z.string().url("رابط غير صحيح").or(z.literal("")).optional(),
    image: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

export function BookForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const defaultValues: BookFormValues = {
        title: initialData?.title || "",
        description: initialData?.description || "",
        tag: initialData?.tag || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : "",
        bookURL: initialData?.bookURL || "",
        image: initialData?.image || "",
    };

    const form = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues,
    });

    const onSubmit = (values: BookFormValues) => {
        startTransition(async () => {
            const result = await saveBook(initialData?.id, values);
            if (result.error) {
                toast.error("خطأ في الحفظ", { description: result.error });
            } else {
                toast.success(initialData?.id ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح");
                router.push("/dashboard/books");
                router.refresh();
            }
        });
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/books">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-bold md:text-2xl">
                    {initialData?.id ? "تعديل الكتاب" : "إضافة كتاب جديد"}
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
                    <Label htmlFor="bookURL">رابط الكتاب (URL)</Label>
                    <Input id="bookURL" type="url" {...form.register("bookURL")} disabled={isPending} placeholder="https://..." dir="ltr" />
                    {form.formState.errors.bookURL && (
                        <p className="text-sm text-destructive">{form.formState.errors.bookURL.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>صورة الغلاف</Label>
                    <AssetPicker
                        value={form.watch("image")}
                        onChange={(val) => form.setValue("image", val)}
                        label="اختر صورة للغلاف"
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
