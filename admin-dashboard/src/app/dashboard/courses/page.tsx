import { getEntries } from "@/app/actions/contentful";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { ContentRowActions } from "@/components/content-row-actions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function CoursesPage() {
    const courses = await getEntries("course");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-2xl">إدارة الدورات</h1>
                <Button asChild>
                    <Link href="/dashboard/courses/new">
                        <PlusCircle className="mr-2 h-4 w-4 ml-2" />
                        إضافة دورة
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">العنوان</TableHead>
                            <TableHead className="text-right">التصنيف (Tag)</TableHead>
                            <TableHead className="text-right">حالة النشر</TableHead>
                            <TableHead className="text-right">تاريخ الإضافة</TableHead>
                            <TableHead className="text-right w-[100px]">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    لا توجد دورات حالياً.
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course: any) => {
                                const isPublished = !!course.sys.publishedVersion;
                                const date = course.date ? course.date[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : null;
                                const title = course.title ? course.title[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : "بدون عنوان";
                                const tag = course.tag ? course.tag[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : "-";

                                return (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium">{title}</TableCell>
                                        <TableCell>
                                            {tag && <Badge variant="outline">{tag}</Badge>}
                                        </TableCell>
                                        <TableCell>
                                            {isPublished ? (
                                                <Badge className="bg-green-600 hover:bg-green-700">منشور</Badge>
                                            ) : (
                                                <Badge variant="secondary">مسودة</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {date ? format(new Date(date), "PPP", { locale: ar }) : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <ContentRowActions
                                                id={course.id}
                                                isPublished={isPublished}
                                                editUrl={`/dashboard/courses/${course.id}`}
                                                revalidatePath="/dashboard/courses"
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
