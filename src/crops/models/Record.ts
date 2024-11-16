export interface AppRecord {
    id: string;
    updatedDate: string;
    author: string;
    payload: {
      [key: string]: string | number | any;
    };
  }
  

export interface RecordWrapper {
    crops: AppRecord[];
}