import { Router } from 'express';
import { RoleController } from '../controllers/roles.controller.js';
import { RoleService } from '../services/role.service.js';
import { asyncHandler } from '../middleware/error-handler.middleware.js';

const rolesRouter = Router();
const entityName = 'roles';

const roleService = new RoleService();
const roleController = new RoleController(roleService);

rolesRouter
  .route('/roles')
  .get(asyncHandler(async (req, res) => roleController.getRoles(req, res)))
  .post(asyncHandler(async (req, res) => roleController.createRole(req, res)));

rolesRouter
  .route(`/${entityName}/:id`)
  .get(asyncHandler(async (req, res) => roleController.getRoleById(req, res)))
  .put(asyncHandler(async (req, res) => roleController.updateRole(req, res)))
  .delete(asyncHandler(async (req, res) => roleController.removeRole(req, res)));

export default rolesRouter;
