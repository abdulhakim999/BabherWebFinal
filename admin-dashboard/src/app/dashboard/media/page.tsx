import { getEnvironment } from "@/lib/contentful";

export const dynamic = "force-dynamic";
import { AssetUpload } from "@/components/asset-upload";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Trash2, ImageIcon, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Image from "next/image";
import { deleteAsset } from "@/app/actions/assets";

async function getAssets() {
    const env = await getEnvironment();
    const assets = await env.getAssets();
    return assets.items.map((item: any) => ({
        id: item.sys.id,
        fields: item.fields,
        sys: item.sys,
    }));
}

export default async function MediaPage() {
    const assets = await getAssets();
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold md:text-2xl">مكتبة الوسائط</h1>
                <AssetUpload />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {assets.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        لا توجد وسائط حالياً. قم برفع ملف جديد.
                    </div>
                ) : (
                    assets.map((asset: any) => {
                        const file = asset.fields.file?.[locale];
                        const title = asset.fields.title?.[locale] || "ملف";
                        const isPublished = !!asset.sys.publishedVersion;
                        const url = file?.url ? `https:${file.url}` : null;
                        const contentType = file?.contentType || "";
                        const isImage = contentType.startsWith("image/");
                        const isVideo = contentType.startsWith("video/");

                        return (
                            <Card key={asset.id} className="overflow-hidden relative group">
                                <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <form action={async () => {
                                        "use server";
                                        await deleteAsset(asset.id);
                                    }}>
                                        <Button variant="destructive" size="icon" className="h-7 w-7">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                                <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                                    {isImage && url ? (
                                        <img src={url} alt={title} className="object-cover w-full h-full" />
                                    ) : isVideo ? (
                                        <Video className="h-10 w-10 text-muted-foreground" />
                                    ) : (
                                        <FileText className="h-10 w-10 text-muted-foreground" />
                                    )}
                                    {!isPublished && (
                                        <div className="absolute bottom-2 right-2">
                                            <Badge variant="destructive">مسودة</Badge>
                                        </div>
                                    )}
                                </div>
                                <CardFooter className="p-3 text-xs flex-col items-start gap-1">
                                    <div className="font-medium truncate w-full">{title}</div>
                                    <div className="text-muted-foreground truncate w-full" dir="ltr">
                                        {format(new Date(asset.sys.updatedAt), "PP", { locale: ar })}
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
