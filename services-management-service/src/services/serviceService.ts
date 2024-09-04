import errorHandler from '../helpers/errorHandler';
import { Service } from '../models/service';
import { ServiceRepository } from '../repositories/serviceRepository';

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async createService(data: Partial<Service>): Promise<Service> {
        // Add any business logic here
        try {
            return this.serviceRepository.createService(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getServiceById(id: number): Promise<Service | null> {
        try {
            return this.serviceRepository.getServiceById(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async updateService(id: number, data: Partial<Service>): Promise<Service> {
        try {
            return this.serviceRepository.updateService(id, data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async deleteService(id: number): Promise<Service> {
        try {
            return this.serviceRepository.deleteService(id);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getAllServices(): Promise<Service[]> {
        try {
            return this.serviceRepository.getAllServices();
        } catch (error) {
            throw errorHandler(error);
        }
    }
}
