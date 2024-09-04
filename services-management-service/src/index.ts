import express from 'express';
import serviceRoutes from './routes/serviceRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(authMiddleware); // Apply auth middleware

app.use('/api', serviceRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`services-management-service running on port ${port}`);
});
