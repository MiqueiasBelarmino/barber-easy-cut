import { Request, Response } from 'express';
import { ServiceService } from '../services/serviceService';
import { Service } from '../models/service';

export class ServiceController {
    private serviceService: ServiceService;

    constructor() {
        this.serviceService = new ServiceService();
    }

    public async createService(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body as Partial<Service>;
            const service = await this.serviceService.createService(data);
            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

    public async getServiceById(req: Request, res: Response): Promise<void> {
        try {
            const service = await this.serviceService.getServiceById(Number(req.params.id));
            if (!service) {
                res.status(404).json({ message: 'Service not found' });
            } else {
                res.status(200).json(service);
            }
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    public async updateService(req: Request, res: Response): Promise<void> {
        try {
            const service = await this.serviceService.updateService(Number(req.params.id), req.body);
            res.status(200).json(service);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    public async deleteService(req: Request, res: Response): Promise<void> {
        try {
            await this.serviceService.deleteService(Number(req.params.id));
            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    public async getAllServices(req: Request, res: Response): Promise<void> {
        try {
            const services = await this.serviceService.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }
}
