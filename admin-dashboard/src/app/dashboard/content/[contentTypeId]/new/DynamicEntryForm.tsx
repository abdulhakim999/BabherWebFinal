"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createDynamicEntry } from "@/app/actions/contentTypes";
import { Loader2 } from "lucide-react";

export function DynamicEntryForm({ contentType, contentTypeId }: { contentType: any; contentTypeId: string }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: string) => {
        setFormData((prev) => ({
            ...prev,
            [fieldId]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        toast.loading(`جاري إضافة ${contentType.name}...`);

        try {
            const result = await createDynamicEntry(contentTypeId, formData);

            if (result.success) {
                toast.success("تمت الإضافة بنجاح!");
                router.push(`/dashboard/content/${contentTypeId}`);
                router.refresh();
            } else {
                toast.error(result.error || "حدث خطأ غير معروف");
            }
        } catch (error: any) {
            toast.error("حدث خطأ أثناء الاتصال بالخادم");
            console.error(error);
        } finally {
            setLoading(false);
            toast.dismiss();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {contentType.fields.map((field: any) => {
                    // Skip internal or unsupported fields for this simple dynamic generator
                    if (field.omitted) return null;

                    return (
                        <div key={field.id} className="space-y-2">
                            <Label htmlFor={field.id}>
                                {field.name} {field.required && <span className="text-destructive">*</span>}
                            </Label>

                            {/* Render different inputs based on Contentful field type */}
                            {field.type === 'Text' ? (
                                <Textarea
                                    id={field.id}
                                    placeholder={field.name}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={(e) => handleChange(e, field.id)}
                                    rows={4}
                                />
                            ) : field.type === 'Date' ? (
                                <Input
                                    id={field.id}
                                    type="date"
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={(e) => handleChange(e, field.id)}
                                    // Make date input readable on LTR in some browsers, but keep overall spacing right
                                    className="block ltr-text"
                                />
                            ) : field.type === 'Link' && field.linkType === 'Asset' ? (
                                <div className="space-y-1">
                                    <Input
                                        id={field.id}
                                        type="text"
                                        dir="ltr"
                                        placeholder="الرجاء إدخال معرف (ID) الصورة/الملف من Contentful هنا مؤقتاً"
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleChange(e, field.id)}
                                        required={field.required}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        *في هذه النسخة، يرجى رفع الصورة في Contentful أو مكتبة الوسائط ونسخ المعرف (ID) الخاص بها ولصقه هنا.
                                    </p>
                                </div>
                            ) : (
                                // Default fallback (Symbol, Integer, etc)
                                <Input
                                    id={field.id}
                                    type={field.type === 'Integer' || field.type === 'Number' ? 'number' : 'text'}
                                    placeholder={field.name}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={(e) => handleChange(e, field.id)}
                                />
                            )}

                            {field.localized && (
                                <p className="text-[10px] text-muted-foreground">هذا الحقل يدعم الترجمة</p>
                            )}
                        </div>
                    );
                })}
            </div>

            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                    <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                    </>
                ) : (
                    "حفظ وإنشاء"
                )}
            </Button>
        </form>
    );
}
