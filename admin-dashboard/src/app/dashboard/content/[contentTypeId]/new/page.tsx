import { getDynamicContentType } from "@/app/actions/contentTypes";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DynamicEntryForm } from "./DynamicEntryForm";

export const dynamic = "force-dynamic";

export default async function NewDynamicEntryPage({ params }: { params: { contentTypeId: string } }) {
    const { contentTypeId } = params;

    const result = await getDynamicContentType(contentTypeId);

    if (!result.success || !result.contentType) {
        notFound();
    }

    const contentType = result.contentType;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/content/${contentTypeId}`}>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">إضافة {contentType.name}</h1>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>تفاصيل المحتوى</CardTitle>
                    <CardDescription>
                        يرجى تعبئة الحقول التالية لإضافة عنصر جديد في قسم {contentType.name}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DynamicEntryForm contentType={contentType} contentTypeId={contentTypeId} />
                </CardContent>
            </Card>
        </div>
    );
}
