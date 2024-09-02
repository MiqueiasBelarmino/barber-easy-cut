import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/user';
import AuthRepository from '../repositories/authRepository';

export default class AuthController {
    private prisma: PrismaClient;
    private transporter: nodemailer.Transporter;
    private repository: AuthRepository;

    constructor() {
        this.prisma = new PrismaClient();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        this.repository = new AuthRepository();

    }

    public async register(req: Request, res: Response) {
        const data = req.body as Partial<User>;

        const hashedPassword = await bcrypt.hash(`${data.password}`, 10);
        data.password = hashedPassword;

        try {
            const user = await this.repository.create(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as any).message })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_KEY as string,
                {
                    expiresIn: '1h',
                }
            );

            res.json({ token });
        } catch (error) {
            return res.status(500).json({ error: (error as any).message });
        }
    }

    public async requestPasswordReset(req: Request, res: Response) {
        const { email } = req.body;

        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            await this.prisma.user.update({
                where: { email },
                data: {
                    passwordResetToken: hashedToken,
                    passwordResetExpires: resetTokenExpiry,
                },
            });

            const resetURL = `http://localhost:${process.env.PORT || 3000}/reset-password/${resetToken}`;

            await this.transporter.sendMail({
                to: user.email,
                from: 'no-reply@barbereasycut.com',
                subject: 'Password Reset Request',
                html: `<p>You requested a password reset</p><p>Click <a href="${resetURL}">here</a> to reset your password</p>`,
            });

            res.status(200).json({ message: 'Password reset token sent to email' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    public async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    passwordResetToken: hashedToken,
                    passwordResetExpires: { gt: new Date() },
                },
            });

            if (!user) {
                return res.status(400).json({ error: 'Token is invalid or has expired' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    passwordResetToken: null,
                    passwordResetExpires: null,
                },
            });

            res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            res.status(500).json({ error: 'Error resetting password' });
        }
    }
}
