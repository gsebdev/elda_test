import { Router } from 'express';
import * as controller from '../controllers/roles.controller.js';

const router = Router();
const entityName = 'roles';

router.route('/roles').get(controller.getRoles).post(controller.createRole);

router
  .route(`/${entityName}/:id`)
  .get(controller.getRoleById)
  .put(controller.updateRole)
  .delete(controller.removeRole);

export default router;
