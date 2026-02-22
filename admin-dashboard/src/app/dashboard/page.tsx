import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";
import { getEnvironment } from "@/lib/contentful";
import { Book, LibraryBig, Video, ImageIcon, PlusCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CreateContentTypeModal } from "@/components/CreateContentTypeModal";

async function getStats() {

    // Since we run on server, we can fetch stats via CMA. 
    // We'll count published entries per content type
    const environment = await getEnvironment();

    const [books, courses, lectures, media] = await Promise.all([
        environment.getEntries({ content_type: 'books', limit: 1 }),
        environment.getEntries({ content_type: 'course', limit: 1 }),
        environment.getEntries({ content_type: 'lectures', limit: 1 }),
        environment.getAssets({ limit: 1 }),
    ]);

    return {
        books: books.total,
        courses: courses.total,
        lectures: lectures.total,
        media: media.total,
    };
}

export default async function DashboardPage() {
    let stats = { books: 0, courses: 0, lectures: 0, media: 0 };
    let error = null;

    try {
        stats = await getStats();
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">نظرة عامة</h1>
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            <span>إضافة جديد</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>ماذا تريد أن تضيف؟</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/dashboard/books/new" className="flex items-center">
                                <Book className="ml-2 h-4 w-4" />
                                <span>إضافة كتاب</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/dashboard/courses/new" className="flex items-center">
                                <LibraryBig className="ml-2 h-4 w-4" />
                                <span>إضافة دورة/درس</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/dashboard/lectures/new" className="flex items-center">
                                <Video className="ml-2 h-4 w-4" />
                                <span>إضافة محاضرة</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/dashboard/fatwas/new" className="flex items-center">
                                <HelpCircle className="ml-2 h-4 w-4" />
                                <span>إضافة فتوى</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <CreateContentTypeModal />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {error ? (
                <Card className="bg-destructive/10 border-destructive">
                    <CardContent className="pt-6 text-destructive font-medium">
                        حدث خطأ أثناء جلب البيانات من Contentful: {error}. تأكد من إعدادات البيئة الخاصة بك.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الكتب</CardTitle>
                            <Book className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.books}</div>
                            <p className="text-xs text-muted-foreground">عنصر في المحتوى</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الدورات</CardTitle>
                            <LibraryBig className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.courses}</div>
                            <p className="text-xs text-muted-foreground">عنصر في المحتوى</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">المحاضرات</CardTitle>
                            <Video className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.lectures}</div>
                            <p className="text-xs text-muted-foreground">عنصر في المحتوى</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">مكتبة الوسائط</CardTitle>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.media}</div>
                            <p className="text-xs text-muted-foreground">صورة ومقطع</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
