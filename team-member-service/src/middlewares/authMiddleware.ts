import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_KEY as string, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Ensure decoded is treated as JwtPayload
        const decodedPayload = decoded as JwtPayload;

        if (decodedPayload.userId) {
            req.user = decodedPayload;
            next();
        } else {
            return res.status(403).json({ message: 'Token payload does not contain userId' });
        }
    });
};
