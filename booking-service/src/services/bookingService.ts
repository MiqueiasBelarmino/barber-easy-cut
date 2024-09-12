import BookingRepository from '../repositories/bookingRepository';
import { Booking } from '@prisma/client';

export default class BookingService {
    private bookingRepository: BookingRepository;

    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    
    async createBooking(data: Partial<Booking>): Promise<Booking> {
        return await this.bookingRepository.create(data);
    }

    async getBooking(bookingId: number): Promise<Booking | null> {
        return await this.bookingRepository.findById(bookingId);
    }

}
