import { PrismaClient } from "@prisma/client";
import errorHandler from "../helpers/errorHandler";

export class GenericRepository<T> {

    private prisma: PrismaClient;
    private modelName: keyof PrismaClient;

    constructor(modelName: keyof PrismaClient) {
        this.prisma = new PrismaClient();
        this.modelName = modelName;
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            return await (this.prisma[this.modelName] as any).create({ data });
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findById(id: number): Promise<T> {
        try {
            return await (this.prisma[this.modelName] as any).findUnique({ where: { id } });
        } catch (error) {
            throw errorHandler(error);
        }
    }

}