import type { Request, Response } from 'express';
import { RoleService } from '../services/role.service.js';
import { Logger } from '../utils/logger.js';
import { RequestIdDto } from '../dtos/request-id.dto.js';
import RequestWriteRoleDto from '../dtos/request-write-role.dto.js';

export class RoleController {
  private logger = new Logger('RoleController');

  constructor(private roleService: RoleService) {}

  async getRoles(_: Request, res: Response) {
    const roles = await this.roleService.getAllRoles();

    res.json({
      success: true,
      data: roles,
    });
  }

  async getRoleById(req: Request, res: Response) {
    const params = new RequestIdDto(req.params);

    const role = await this.roleService.getRoleByIdOrThrow(params.id);

    res.json({
      success: true,
      data: role,
    });
  }

  async createRole(req: Request, res: Response) {
    const body = new RequestWriteRoleDto(req.body);

    const role = await this.roleService.createRoleOrThrow(body);

    this.logger.log(`Role created with id: ${role.id}`);

    res.status(201).json({
      success: true,
      data: role,
      message: 'Role created successfully',
    });
  }

  async updateRole(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const body = new RequestWriteRoleDto(req.body);

    const role = await this.roleService.updateRoleOrThrow(id, body);

    this.logger.log(`Role ${id} updated successfully`);

    res.json({
      success: true,
      data: role,
      message: 'Role updated successfully',
    });
  }

  async removeRole(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const role = await this.roleService.deleteRoleOrThrow(id);

    this.logger.log(`Role ${id} deleted successfully`);

    res.json({
      success: true,
      data: role,
      message: 'Role deleted successfully',
    });
  }
}
