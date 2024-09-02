export default interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}