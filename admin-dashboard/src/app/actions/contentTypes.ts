'use server';

import { getEnvironment } from "@/lib/contentful";

export async function createContentType(name: string, id: string, description?: string) {
    try {
        const environment = await getEnvironment();

        // Check if content type already exists
        try {
            const existing = await environment.getContentType(id);
            if (existing) {
                return { success: false, error: "يوجد قسم بهذا المعرف مسبقاً، الرجاء اختيار معرف آخر." };
            }
        } catch (e: any) {
            // It's expected to fail if it doesn't exist
            if (e.name !== 'NotFound') {
                console.error("Error checking content type:", e);
                // We'll proceed assuming it doesn't exist if it's Not Found
            }
        }

        const contentType = await environment.createContentTypeWithId(id, {
            name: name,
            description: description || `قسم لـ ${name}`,
            displayField: 'title', // We'll always assume a title field for simplicity
            fields: [
                {
                    id: 'title',
                    name: 'العنوان',
                    required: true,
                    localized: true,
                    type: 'Symbol',
                },
                {
                    id: 'description',
                    name: 'الوصف',
                    required: false,
                    localized: true,
                    type: 'Text',
                },
                // Let's add an image field by default as well, it's very common
                {
                    id: 'image',
                    name: 'الصورة',
                    required: false,
                    localized: false,
                    type: 'Link',
                    linkType: 'Asset',
                },
                {
                    id: 'publishDate',
                    name: 'تاريخ النشر',
                    required: false,
                    localized: false,
                    type: 'Date',
                }
            ]
        });

        // Publish the content type so it can be used immediately
        await contentType.publish();

        return { success: true, contentTypeId: id };
    } catch (error: any) {
        console.error('Error creating content type:', error);
        return { success: false, error: error.message || "حدث خطأ غير معروف" };
    }
}

export async function getDynamicContentType(contentTypeId: string) {
    try {
        const environment = await getEnvironment();
        const contentType = await environment.getContentType(contentTypeId);
        return { success: true, contentType };
    } catch (error: any) {
        console.error(`Error fetching content type ${contentTypeId}:`, error);
        return { success: false, error: error.message };
    }
}

export async function getDynamicEntries(contentTypeId: string) {
    try {
        const environment = await getEnvironment();
        const entries = await environment.getEntries({
            content_type: contentTypeId,
            order: ['-sys.createdAt'],
        });

        // Enhance entries with publication status
        const enrichedEntries = entries.items.map((entry: any) => {
            const isDraft = !entry.sys.publishedVersion;
            const isChanged = entry.sys.publishedVersion && entry.sys.version > entry.sys.publishedVersion + 1;

            return {
                ...entry,
                status: isDraft ? 'draft' : isChanged ? 'changed' : 'published'
            };
        });

        return { success: true, entries: enrichedEntries };
    } catch (error: any) {
        console.error(`Error fetching entries for ${contentTypeId}:`, error);
        return { success: false, error: error.message };
    }
}

export async function createDynamicEntry(contentTypeId: string, formData: any) {
    try {
        const environment = await getEnvironment();
        const contentType = await environment.getContentType(contentTypeId);

        // Build fields payload dynamically
        const fieldsPayload: { [key: string]: { [locale: string]: any } } = {};

        contentType.fields.forEach((field: any) => {
            const fieldId = field.id;
            const fieldValue = formData[fieldId];

            if (fieldValue !== undefined && fieldValue !== '') {
                // If the field is an asset link
                if (field.type === 'Link' && field.linkType === 'Asset') {
                    fieldsPayload[fieldId] = {
                        'en-US': {
                            sys: {
                                type: 'Link',
                                linkType: 'Asset',
                                id: fieldValue
                            }
                        }
                    };
                } else if (field.type === 'Date') {
                    fieldsPayload[fieldId] = {
                        'en-US': new Date(fieldValue).toISOString()
                    };
                } else {
                    // For text, string, etc., use 'ar' as default localized
                    // Or 'en-US' if not localized, but we'll try to support the user's setup
                    // Usually Arabic is the main language here based on the app
                    fieldsPayload[fieldId] = {
                        'ar': fieldValue,
                        // Add en-US as fallback since contentful sometimes requires it or prefers it
                        ...(field.localized ? {} : { 'en-US': fieldValue })
                    };

                    // If the field was set to NOT localized in the creation step, it might need en-US
                    if (!field.localized) {
                        fieldsPayload[fieldId] = {
                            'en-US': fieldValue
                        };
                    }
                }
            }
        });

        // Create the entry
        let entry = await environment.createEntry(contentTypeId, { fields: fieldsPayload });

        // Publish it immediately
        entry = await entry.publish();

        return { success: true, entryId: entry.sys.id };
    } catch (error: any) {
        console.error(`Error creating entry for ${contentTypeId}:`, error);
        return { success: false, error: error.message || "حدث خطأ غير معروف" };
    }
}
