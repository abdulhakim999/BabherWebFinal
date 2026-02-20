import { getEntry } from "@/app/actions/contentful";

export const dynamic = "force-dynamic";
import { BookForm } from "@/components/book-form";

export default async function EditBookPage({ params }: { params: { id: string } }) {
    const entry = await getEntry(params.id);
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    const initialData = {
        id: entry.sys.id,
        title: entry.fields.title?.[locale] || "",
        description: entry.fields.description?.[locale] || "",
        tag: entry.fields.tag?.[locale] || "",
        date: entry.fields.date?.[locale] || "",
        bookURL: entry.fields.bookURL?.[locale] || "",
        image: entry.fields.image?.[locale]?.sys?.id || "",
    };

    return <BookForm initialData={initialData} />;
}
