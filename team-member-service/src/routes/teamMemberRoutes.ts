import { Router } from 'express';
import TeamMemberController from '../controllers/teamMemberController';

const router = Router();
const controller = new TeamMemberController();

router.post('/team-member', controller.create.bind(controller));
router.get('/team-member/:id', controller.getById.bind(controller));
router.put('/team-member/:id', controller.update.bind(controller));
router.delete('/team-member/:id', controller.delete.bind(controller));
router.get('/team-member', controller.getAll.bind(controller));


export default router;
