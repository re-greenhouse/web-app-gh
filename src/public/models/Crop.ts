export interface Crop {
    id: string,
    name: string,
    author: string,
    state: boolean,
    phase: string,
    startDate: string
}

export interface CropWrapper {
    crops: Crop[];
}