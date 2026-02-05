import { ConflictError, InternalError, NotFoundError } from '../errors/internal-errors.js';
import Role from '../models/role.model.js';
import type { RoleType } from './types/role.type.js';

export class RoleService {
  async getAllRoles(): Promise<RoleType[]> {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      order: [['name', 'DESC']],
    });

    return roles.map((role) => role.get({ plain: true }));
  }

  async getRoleByIdOrThrow(id: number): Promise<RoleType> {
    const role = await Role.findByPk(id, {
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    });

    if (!role) {
      throw new NotFoundError('Role');
    }

    return role.get({ plain: true });
  }

  async createRoleOrThrow(data: { name: string }): Promise<RoleType> {
    const existingRole = await Role.findOne({ where: { name: data.name } });

    if (existingRole) {
      throw new ConflictError('Role already exists');
    }

    const role = await Role.create(data);

    if (!role) {
      throw new InternalError('Failed to create role');
    }

    const newId = role.get('id') as number;

    const createdRole = await Role.findByPk(newId, {
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    });

    return createdRole!.get({ plain: true });
  }

  async updateRoleOrThrow(
    id: number,
    data: Partial<{
      name: string | undefined;
    }>,
  ): Promise<RoleType> {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new NotFoundError('Role');
    }

    await role.update(data);

    const updatedRole = await Role.findByPk(id, {
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    });

    return updatedRole!.get({ plain: true });
  }

  async deleteRoleOrThrow(id: number): Promise<RoleType> {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new NotFoundError('Role');
    }

    await role.destroy();

    return role.get({ plain: true });
  }
}
