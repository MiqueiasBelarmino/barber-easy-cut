import { GenericRepository } from './genericRepository';
import errorHandler from '../helpers/errorHandler';
import { Booking } from '../models/booking';

export default class BookingRepository {
    private genericRepository: GenericRepository<Booking>;

    constructor() {
        this.genericRepository = new GenericRepository<Booking>('booking');
    }

    async create(data: Partial<Booking>): Promise<Booking> {
        try {
            return await this.genericRepository.create(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async findById(bookingId: number): Promise<Booking | null> {
        try {
            return await this.genericRepository.findById(bookingId);
        } catch (error) {
            throw errorHandler(error);
        }
    }

}

