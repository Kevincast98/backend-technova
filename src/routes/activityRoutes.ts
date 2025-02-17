import { Router, Request, Response } from 'express';
import * as activityController from '../controllers/activityController';

const router = Router();
router.get('/search', (req: Request, res: Response) => activityController.getActivitiesWithFilters(req, res));
router.get('/', (req: Request, res: Response) => activityController.getActivities(req, res));
router.get('/:id', (req: Request, res: Response) => activityController.getActivityById(req, res));
router.post('/create', (req: Request, res: Response) => activityController.createActivity(req, res));
router.put('/update/:id', (req: Request, res: Response) => activityController.updateActivity(req, res));
router.delete('/delete/:id', (req: Request, res: Response) => activityController.deleteActivity(req, res));

export default router;