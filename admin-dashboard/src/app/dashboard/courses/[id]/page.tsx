import { getEntry } from "@/app/actions/contentful";

export const dynamic = "force-dynamic";
import { CourseForm } from "@/components/course-form";

export default async function EditCoursePage({ params }: { params: { id: string } }) {
    const entry = await getEntry(params.id);
    const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

    const initialData = {
        id: entry.sys.id,
        title: entry.fields.title?.[locale] || "",
        description: entry.fields.description?.[locale] || "",
        tag: entry.fields.tag?.[locale] || "",
        date: entry.fields.date?.[locale] || "",
        videoURL: entry.fields.videoURL?.[locale] || "",
    };

    return <CourseForm initialData={initialData} />;
}
