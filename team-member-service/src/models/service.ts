export interface Service {
    id?: number;
    name: string;
    description: string;
    duration: number; // Duration in minutes
    cost: number;
    createdAt?: Date;
    updatedAt?: Date;
}
