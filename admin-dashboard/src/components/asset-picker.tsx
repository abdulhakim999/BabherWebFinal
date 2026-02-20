"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getAssetsList } from "@/app/actions/assets";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AssetPickerProps {
    value?: string;
    onChange: (assetId: string) => void;
    label?: string;
}

export function AssetPicker({ value, onChange, label = "اختر صورة" }: AssetPickerProps) {
    const [open, setOpen] = useState(false);
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && assets.length === 0) {
            setLoading(true);
            getAssetsList().then((data) => {
                setAssets(data);
                setLoading(false);
            });
        }
    }, [open, assets.length]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                    <ImageIcon className="mr-2 h-4 w-4 ml-2" />
                    {value ? "تم اختيار صورة" : label}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
                <DialogHeader>
                    <DialogTitle>اختر من مكتبة الوسائط</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-10 text-center text-muted-foreground">جاري التحميل...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {assets.length === 0 && (
                            <div className="col-span-full py-10 text-center text-muted-foreground">لا توجد وسائط.</div>
                        )}
                        {assets.map((asset) => {
                            const file = asset.fields.file?.["ar"] || asset.fields.file?.["en-US"];
                            const url = file?.url ? `https:${file.url}` : null;
                            const isImage = file?.contentType?.startsWith("image/");

                            if (!isImage || !url) return null; // Only show images for picker

                            return (
                                <Card
                                    key={asset.id}
                                    className="cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                                    onClick={() => {
                                        onChange(asset.id);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="aspect-square bg-muted">
                                        <img src={url} alt="asset" className="object-cover w-full h-full" />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
