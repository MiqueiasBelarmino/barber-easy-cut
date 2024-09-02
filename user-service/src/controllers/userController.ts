import { Request, Response } from 'express';
import UserService from '../services/userService';
import User from '../models/user';
import bcrypt from 'bcryptjs';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async updateUser(req: Request, res: Response) {

        try {
            const { userId } = req.params;
            const data = req.body as Partial<User>;

            if (data.password) {
                const hashedPassword = await bcrypt.hash(`${data.password}`, 10);
                data.password = hashedPassword;
            }

            const user = await this.userService.getUser(parseInt(userId));

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const response = await this.userService.update(user.id, data);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

    public async getUser(req: Request, res: Response) {
        
        try {
            
            const { userId } = req.params;
            const user = await this.userService.getUser(parseInt(userId));

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }
}
