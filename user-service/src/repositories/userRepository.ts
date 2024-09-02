import errorHandler from '../helpers/errorHandler';
import User from '../models/user';
import { GenericRepository } from './genericRepository';

export default class UserRepository {

    async update(id: number, data: Partial<User>): Promise<User> {
        try {
            return await (new GenericRepository<User>('user')).update(id, data);
        } catch (error) {
            throw errorHandler(error);
        }
    }
}