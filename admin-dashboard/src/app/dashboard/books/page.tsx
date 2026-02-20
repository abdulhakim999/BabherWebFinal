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

export default async function BooksPage() {
    const books = await getEntries("books");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-2xl">إدارة الكتب</h1>
                <Button asChild>
                    <Link href="/dashboard/books/new">
                        <PlusCircle className="mr-2 h-4 w-4 ml-2" />
                        إضافة كتاب
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
                        {books.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    لا توجد كتب حالياً.
                                </TableCell>
                            </TableRow>
                        ) : (
                            books.map((book: any) => {
                                const isPublished = !!book.sys.publishedVersion;
                                const date = book.date ? book.date[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : null;
                                const title = book.title ? book.title[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : "بدون عنوان";
                                const tag = book.tag ? book.tag[process.env.CONTENTFUL_LOCALE_DEFAULT || "ar"] : "-";

                                return (
                                    <TableRow key={book.id}>
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
                                                id={book.id}
                                                isPublished={isPublished}
                                                editUrl={`/dashboard/books/${book.id}`}
                                                revalidatePath="/dashboard/books"
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
