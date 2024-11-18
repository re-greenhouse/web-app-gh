export interface Crop {
    id: string,
    name: string,
    author: string,
    state: boolean,
    phase: string,
    startDate: string
}

export interface CropDone {
    id: string,
    name: string,
    author: string,
    state: boolean,
    phase: string,
    startDate: string,
    imageUrl?: string,
    quality?: string
}

export interface CropWrapper {
    crops: Crop[];
}