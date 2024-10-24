export interface Record {
    id: string,
    updatedDate: string,
    author: string,
    phase: string,
    payload: string
}

export interface RecordWrapper {
    crops: Record[];
}