"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Layers } from "lucide-react";
import { createContentType } from "@/app/actions/contentTypes";

export function CreateContentTypeModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    // Auto-generate ID from Name (simplify to English letters/numbers if needed, but Contentful might accept generic IDs. Best to limit to alphanumeric)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        // Simple slugification for ID if empty or matches auto-generated pattern
        if (id === "" || id === value.toLowerCase().replace(/[^a-z0-9]/g, '')) {
            // Generate English ID fallback if Arabic
            // A basic transliteration or just forcing user to type ID is safer
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !id) {
            toast.error("الرجاء إدخال الاسم والمعرف");
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
            toast.error("المعرف يجب أن يحتوي على أحرف إنجليزية وأرقام فقط (بدون مسافات)");
            return;
        }

        setLoading(true);
        toast.loading("جاري إنشاء القسم في Contentful...");

        try {
            const result = await createContentType(name, id, description);

            if (result.success) {
                toast.success("تم إنشاء القسم بنجاح!");
                setOpen(false);
                setName("");
                setId("");
                setDescription("");

                // Route to the new generic dynamic route that we will build
                // router.push(`/dashboard/content/${result.contentTypeId}`);
                router.refresh(); // Refresh the dashboard stats
            } else {
                toast.error(result.error);
            }
        } catch (error: any) {
            toast.error("حدث خطأ أثناء الاتصال بالخادم");
            console.error(error);
        } finally {
            setLoading(false);
            toast.dismiss(); // dismiss loading toast
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div role="menuitem" className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    <Layers className="ml-2 h-4 w-4" />
                    <span>إنشاء قسم جديد (متقدم)</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>إنشاء قسم محتوى جديد</DialogTitle>
                        <DialogDescription>
                            سيتم إنشاء Content Model جديد لك في Contentful مع حقول افتراضية (العنوان، الوصف، الصورة، وتاريخ النشر).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                اسم القسم
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="مثال: التصالات، الفتاوى، الأخبار"
                                className="col-span-3 text-right"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">
                                المعرّف (ID)
                            </Label>
                            <Input
                                id="id"
                                value={id}
                                onChange={(e) => setId(e.target.value.toLowerCase().trim())}
                                placeholder="مثال: fatwa (إنجليزي فقط)"
                                className="col-span-3"
                                dir="ltr"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                وصف القسم
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="وصف اختياري للقسم..."
                                className="col-span-3 text-right"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "جاري الإنشاء..." : "حفظ وإنشاء"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
