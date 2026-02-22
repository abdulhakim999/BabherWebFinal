import { getEnvironment } from "@/lib/contentful";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { CreateContentTypeModal } from "@/components/CreateContentTypeModal";

export const dynamic = "force-dynamic";

export default async function ContentTypesPage() {
    let contentTypes = [];
    let error = null;

    try {
        const environment = await getEnvironment();
        const response = await environment.getContentTypes();
        contentTypes = response.items;
    } catch (e: any) {
        error = e.message;
    }

    // Filter out standard ones if we want to, but it's good to see all
    // const builtinTypes = ['books', 'course', 'lectures'];
    // const customTypes = contentTypes.filter(ct => !builtinTypes.includes(ct.sys.id));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">إدارة أقسام المحتوى</h1>
                    <p className="text-sm text-muted-foreground">عرض وإدارة جميع النماذج والأقسام المتاحة في قاعدة البيانات.</p>
                </div>
                <CreateContentTypeModal />
            </div>

            {error ? (
                <Card className="bg-destructive/10 border-destructive">
                    <CardContent className="pt-6 text-destructive font-medium">
                        حدث خطأ أثناء جلب الأقسام: {error}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {contentTypes.map((type: any) => (
                        <Card key={type.sys.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Layers className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                        ID: {type.sys.id}
                                    </span>
                                </div>
                                <CardTitle className="mt-4">{type.name}</CardTitle>
                                <CardDescription className="line-clamp-2 min-h-[40px]">
                                    {type.description || "لا يوجد وصف"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-4 flex gap-2">
                                <Button className="w-full gap-2" asChild>
                                    <Link href={`/dashboard/content/${type.sys.id}`}>
                                        <Settings className="h-4 w-4" />
                                        إدارة المحتوى
                                    </Link>
                                </Button>
                                <Button className="w-full gap-2" variant="secondary" asChild>
                                    <Link href={`/dashboard/content/${type.sys.id}/new`}>
                                        <PlusCircle className="h-4 w-4" />
                                        إضافة جديد
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
