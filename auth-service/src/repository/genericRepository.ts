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

    async update(id: number, data: Partial<T>): Promise<T> {
        try {
            return await (this.prisma[this.modelName] as any).update({ where: { id }, data });
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async delete(id: number): Promise<T> {
        try {
            return await (this.prisma[this.modelName] as any).delete({ where: { id } });
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findMany(): Promise<T[]> {
        try {
            return await (this.prisma[this.modelName] as any).findMany();
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findByColumns(columns: Array<{ columnName: keyof T; value: any }>): Promise<T[]> {
        try {

            const whereClause = columns.reduce((acc, { columnName, value }) => {
                acc[columnName] = value;
                return acc;
            }, {} as Record<keyof T, any>);

            return await (this.prisma[this.modelName] as any).findMany({ where: whereClause});
        } catch (error) {
            throw errorHandler(error);
        }
    }
}