import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        req.user = decoded;  // Now TypeScript knows about this property
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
