import { Router } from 'express';
import { ServiceController } from '../controllers/serviceController';

const router = Router();
const serviceController = new ServiceController();

router.post('/services', serviceController.createService.bind(serviceController));
router.get('/services/:id', serviceController.getServiceById.bind(serviceController));
router.put('/services/:id', serviceController.updateService.bind(serviceController));
router.delete('/services/:id', serviceController.deleteService.bind(serviceController));
router.get('/services', serviceController.getAllServices.bind(serviceController));

export default router;
