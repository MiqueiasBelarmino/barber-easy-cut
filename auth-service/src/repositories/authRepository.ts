import { PrismaClient, Role } from '@prisma/client';
import errorHandler from '../helpers/errorHandler';
import User from '../models/user';
import { GenericRepository } from './genericRepository';

export default class AuthRepository {

    async create(data: Partial<User>): Promise<User> {
        try {
            return await (new GenericRepository<User>('user')).create(data);
        } catch (error) {
            throw errorHandler(error);
        }
    }
}