import errorHandler from '../helpers/errorHandler';
import User from '../models/user';
import { GenericRepository } from '../repositories/genericRepository';
import UserRepository from '../repositories/userRepository';

export default class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getUser(userId: number) {

        try {
            const user = await (new GenericRepository<User>('user')).findById(userId);
            return user;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    public async update(userId: number, data: Partial<User>) {

        try {
            const user = await (new GenericRepository<User>('user')).update(userId, data);
            return user;
        } catch (error) {
            throw errorHandler(error);
        }
    }
}
