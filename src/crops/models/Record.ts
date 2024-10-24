export interface Record {
    id: string;
    updatedDate: string;
    author: string;
    payload: {
      [key: string]: string | number | any;
    };
  }
  

export interface RecordWrapper {
    crops: Record[];
}