import { Request, Response } from 'express';
import BookingService from '../services/bookingService';

export default class BookingController {
    private bookingService: BookingService;

    constructor(){
        this.bookingService = new BookingService();
    }
    async createBooking(req: Request, res: Response) {
        try {
            const booking = await this.bookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

    async getBooking(req: Request, res: Response) {
        try {
            const booking = await this.bookingService.getBooking(parseInt(req.params.bookingId));
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

}

