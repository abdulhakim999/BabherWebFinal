"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/app/actions/auth";
import { toast } from "sonner";

const loginSchema = z.object({
    username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
    password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export function LoginForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("password", values.password);

            const result = await authenticate(formData);

            if (result?.error) {
                toast.error("خطأ في تسجيل الدخول", {
                    description: result.error,
                });
            }
            // Note: If successful, `authenticate` throws a server-side redirect 
            // which Next.js handles automatically. Do NOT manually router.push here.
        });
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
                    <CardDescription>
                        أدخل بيانات الاعتماد الخاصة بك للوصول للوحة التحكم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">اسم المستخدم</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="admin"
                                    {...form.register("username")}
                                    required
                                />
                                {form.formState.errors.username && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...form.register("password")}
                                    required
                                />
                                {form.formState.errors.password && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "جاري التحقق..." : "دخول"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
