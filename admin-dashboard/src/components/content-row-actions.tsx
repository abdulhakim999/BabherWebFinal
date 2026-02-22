"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteEntry, togglePublish } from "@/app/actions/contentful";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ContentRowActionsProps {
    id: string;
    isPublished: boolean;
    editUrl: string;
    revalidatePath: string;
}

export function ContentRowActions({
    id,
    isPublished,
    editUrl,
    revalidatePath,
}: ContentRowActionsProps) {
    const [isPending, startTransition] = useTransition();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const router = useRouter();

    const handlePublishToggle = () => {
        startTransition(async () => {
            try {
                const res = await togglePublish(id, isPublished, revalidatePath);
                if (res.error) toast.error("حدث خطأ", { description: res.error });
                else toast.success(isPublished ? "تم إلغاء النشر" : "تم النشر بنجاح");
                router.refresh();
            } catch (err) {
                console.error("Publish error:", err);
                toast.error("حدث خطأ غير متوقع", { description: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً." });
            }
        });
    };

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const res = await deleteEntry(id, revalidatePath);
                if (res.error) toast.error("خطأ في الحذف", { description: res.error });
                else toast.success("تم الحذف بنجاح");
                setShowDeleteAlert(false);
                router.refresh();
            } catch (err) {
                console.error("Delete error:", err);
                toast.error("حدث خطأ غير متوقع", { description: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً." });
            }
        });
    };

    return (
        <>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={editUrl} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4 ml-2" />
                            تعديل
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handlePublishToggle} className="cursor-pointer">
                        {isPublished ? (
                            <>
                                <EyeOff className="mr-2 h-4 w-4 ml-2" />
                                إلغاء النشر (مسودة)
                            </>
                        ) : (
                            <>
                                <Eye className="mr-2 h-4 w-4 ml-2" />
                                نشر
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setShowDeleteAlert(true);
                        }}
                        className="text-destructive cursor-pointer"
                    >
                        <Trash2 className="mr-2 h-4 w-4 ml-2" />
                        حذف
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent dir="rtl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف هذا العنصر نهائياً من قاعدة البيانات.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:justify-start">
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            disabled={isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending ? "جاري الحذف..." : "نعم، احذف"}
                        </AlertDialogAction>
                        <AlertDialogCancel disabled={isPending}>تراجع</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
