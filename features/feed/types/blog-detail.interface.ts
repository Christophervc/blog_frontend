export interface BlogResponse {
    data:        Data[];
    nextCursor:  Date;
    hasNextPage: boolean;
}

export interface Data {
    id:          string;
    title:       string;
    slug:        string;
    excerpt:     string;
    content:     string;
    author:      Author;
    category:    Category;
    tags:        Tags[];
    readingTime: number;
    createdAt:   Date;
    updatedAt:   Date;
    status:      string;
    images:      Image[];
}

export interface Tags {
    id:   string;
    name: string;
}

export interface Author {
    id:   string;
    name: string;
}

export interface Category {
    id:   string;
    name: string;
}

export interface Image {
    id:        string;
    url:       string;
    publicId?: string;
    altText:   string;
    isCover:   boolean;
}
