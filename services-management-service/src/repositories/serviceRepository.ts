import { PrismaClient } from "@prisma/client";
import { Service } from "../models/service";
import errorHandler from "../helpers/errorHandler";
import { GenericRepository } from "./genericRepository";

export class ServiceRepository {
    private genericRepository: GenericRepository<Service>;

    constructor() {
        this.genericRepository = new GenericRepository<Service>('service');
    }

    async createService(data: Partial<Service>): Promise<Service> {
        try {
            return await this.genericRepository.create(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getServiceById(id: number): Promise<Service | null> {
        try {
            return await this.genericRepository.findById(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async updateService(id: number, data: Partial<Service>): Promise<Service> {
        try {
            return await this.genericRepository.update(id, data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async deleteService(id: number): Promise<Service> {
        try {
            return await this.genericRepository.delete(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getAllServices(): Promise<Service[]> {
        try {
            return await this.genericRepository.findMany();
        } catch (error) {
            throw errorHandler(error);
        }
    }
}
