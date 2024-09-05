import express from 'express';
import bookingRoutes from './routes/bookingRoutes';

const app = express();

app.use(express.json());
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`booking-service is running on port ${PORT}`);
});
