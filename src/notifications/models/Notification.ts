export interface Notification {
    cropId?: string;
    phase?: string;
    message: string;
    action?: string;
    payload?: object;
    recordId?: string;
    differences?: object;
    profileId?: string;
}