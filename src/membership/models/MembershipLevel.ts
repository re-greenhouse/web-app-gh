export interface MembershipLevel {
    id: string,
    benefits: [
        {
            name: string;
            value: number;
        },
        {
            name: string;
            value: number;
        },
        {
            name: string;
            value: number;
        }
    ]
}