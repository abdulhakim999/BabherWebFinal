import Link from "next/link";
import { Book, LayoutDashboard, Settings, Video, Image as ImageIcon, LibraryBig, LogOut, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions/auth";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "الرئيسية" },
    { href: "/dashboard/books", icon: Book, label: "الكتب" },
    { href: "/dashboard/courses", icon: LibraryBig, label: "الدورات" },
    { href: "/dashboard/lectures", icon: Video, label: "المحاضرات" },
    { href: "/dashboard/media", icon: ImageIcon, label: "مكتبة الوسائط" },
    { href: "/dashboard/content", icon: Layers, label: "أقسام المحتوى (متقدم)" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40" dir="rtl">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 right-0 z-10 hidden w-64 flex-col border-l bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                        <span className="font-bold">لوحة تحكم بابحر</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                    <form action={logOut}>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" />
                            تسجيل الخروج
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pr-64 w-full h-full">
                {/* Mobile Header (Hidden on large screens, optional for now, keeping simple MVP) */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:hidden">
                    <Link href="/dashboard" className="font-semibold">لوحة تحكم بابحر</Link>
                </header>

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
