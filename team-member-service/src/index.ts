import express from 'express';
import teamMemberRoutes from './routes/teamMemberRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(authMiddleware); // Apply auth middleware

app.use('/api', teamMemberRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`team-member-service running on port ${port}`);
});
