import { getEntry } from "@/app/actions/contentful";

export const dynamic = "force-dynamic";
import { CourseForm } from "@/components/course-form";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const entry = await getEntry(id);
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    const initialData = {
        id: entry.sys.id,
        title: entry.fields.title?.[locale] || "",
        description: entry.fields.description?.[locale] || "",
        tag: entry.fields.tag?.[locale] || "",
        date: entry.fields.date?.[locale] || "",
        videoUrl: entry.fields.videoUrl?.[locale] || "",
        image: entry.fields.image?.[locale]?.sys?.id || "",
    };

    return <CourseForm initialData={initialData} />;
}
