export interface CreateJournalRequest{
    content: string;
}

export interface UpdateJournalRequest{
    content?: string;
}

export interface JournalResponse{
    id: string;
    content: string;
    createdAt: string;
    updateAt: string;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}