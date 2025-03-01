export interface ClassBrief {
    courseTitle: string;
    courseCode: string;
    classCode: string;
    classId: string;
    tutor: string;
    classRoom: string;
}

export interface ClassSection {
    section: string;
    sectionId: string;
    contents: Content[];
}

export interface Content {
    contentType: ContentType;
    contentId: string;
    contentName: string;
    contentDescription: string;
    content: string;
}

export type ContentType = "file" | "text" | "submission";