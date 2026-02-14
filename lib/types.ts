export interface Media {
    id: string;
    alt: string;
    url?: string;
    width?: number;
    height?: number;
    mimeType?: string;
    filesize?: number;
    filename?: string;
    sizes?: {
        thumbnail?: {
            url?: string;
            width?: number;
            height?: number;
            mimeType?: string;
            filesize?: number;
            filename?: string;
        };
        card?: {
            url?: string;
            width?: number;
            height?: number;
            mimeType?: string;
            filesize?: number;
            filename?: string;
        };
        tablet?: {
            url?: string;
            width?: number;
            height?: number;
            mimeType?: string;
            filesize?: number;
            filename?: string;
        };
    };
}

export interface RichTextNode {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    type?: string;
    children?: RichTextNode[];
    url?: string;
    newTab?: boolean;
}

export interface Project {
    id: string;
    title: string;
    numericId: number;
    category: string;
    year: string;
    description: string;
    color?: string; // Optional because CaseStudies has default, but Projects required it. Keeping optional to be safe or union.
    image: string | Media; // Upload field can be ID or object depending on depth
    content: RichTextNode[]; // RichText content
    images?: {
        image: string | Media;
        id?: string;
    }[];
    slug?: string;
    createdAt: string;
    updatedAt: string;
}

// CaseStudy has the same structure as Project for the fields used in the page
export type CaseStudy = Project;
