import { getDynamicContentType, getDynamicEntries } from "@/app/actions/contentTypes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function DynamicContentPage({ params }: { params: { contentTypeId: string } }) {
    const { contentTypeId } = params;

    // Fetch Content Type info and its entries concurrently
    const [typeResult, entriesResult] = await Promise.all([
        getDynamicContentType(contentTypeId),
        getDynamicEntries(contentTypeId)
    ]);

    if (!typeResult.success || !typeResult.contentType) {
        notFound();
    }

    const contentType = typeResult.contentType;
    const entries = entriesResult.success ? entriesResult.entries : [];

    // Determine the main display field
    const displayFieldId = contentType.displayField || 'title';

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">{contentType.name}</h1>
                    <p className="text-sm text-muted-foreground">{contentType.description || `إدارة محتوى القسم ${contentType.name}`}</p>
                </div>
                <Button asChild className="gap-2">
                    <Link href={`/dashboard/content/${contentTypeId}/new`}>
                        <PlusCircle className="h-4 w-4" />
                        <span>إضافة جديد</span>
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>قائمة العناصر</CardTitle>
                    <CardDescription>
                        عرض جميع العناصر المضافة في هذا القسم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {entries && entries.length > 0 ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">العنوان / الاسم</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                        <TableHead className="text-right">تاريخ الإضافة</TableHead>
                                        <TableHead className="text-right">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {entries.map((entry: any) => {
                                        // Try to find the title based on displayField or first string field
                                        let entryTitle = 'بدون عنوان';
                                        if (entry.fields[displayFieldId] && entry.fields[displayFieldId]['ar']) {
                                            entryTitle = entry.fields[displayFieldId]['ar'];
                                        } else if (entry.fields[displayFieldId] && entry.fields[displayFieldId]['en-US']) {
                                            entryTitle = entry.fields[displayFieldId]['en-US'];
                                        } else if (entry.fields.title && entry.fields.title['ar']) {
                                            entryTitle = entry.fields.title['ar'];
                                        }

                                        return (
                                            <TableRow key={entry.sys.id}>
                                                <TableCell className="font-medium">{entryTitle}</TableCell>
                                                <TableCell>
                                                    {entry.status === 'published' && <Badge className="bg-green-500 hover:bg-green-600">منشور</Badge>}
                                                    {entry.status === 'draft' && <Badge variant="outline" className="text-amber-500 border-amber-500">مسودة</Badge>}
                                                    {entry.status === 'changed' && <Badge className="bg-blue-500 hover:bg-blue-600">معدل وينتظر النشر</Badge>}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(entry.sys.createdAt).toLocaleDateString("ar-SA")}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/dashboard/content/${contentTypeId}/${entry.sys.id}`}>
                                                            تعديل
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/20 border-dashed">
                            <Search className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">لا توجد عناصر بعد</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">
                                لم تقم بإضافة أي محتوى في هذا القسم حتى الآن.
                            </p>
                            <Button asChild variant="outline">
                                <Link href={`/dashboard/content/${contentTypeId}/new`}>
                                    إضافة أول عنصر
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
