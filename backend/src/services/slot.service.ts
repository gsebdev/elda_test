import { InternalError, NotFoundError, ValidationError } from '../errors/internal-errors.js';
import Employee from '../models/employee.model.js';
import Slot from '../models/slot.model.js';
import type { SlotWithEmployeeType } from './types/slot.type.js';

export class SlotService {
  async getAllSlots(): Promise<SlotWithEmployeeType[]> {
    const slots = await Slot.findAll({
      include: [
        {
          association: 'employee',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          include: [
            {
              association: 'roleDetails',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: [
        'id',
        'startDateTime',
        'endDateTime',
        'description',
        'employeeId',
        'createdAt',
        'updatedAt',
      ],
      order: [['startDateTime', 'ASC']],
    });

    return slots.map((slot) => slot.get({ plain: true }));
  }

  async getSlotByIdOrThrow(id: number): Promise<SlotWithEmployeeType> {
    const slot = await Slot.findByPk(id, {
      include: [
        {
          association: 'employee',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          include: [
            {
              association: 'roleDetails',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: [
        'id',
        'startDateTime',
        'endDateTime',
        'description',
        'employeeId',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!slot) {
      throw new NotFoundError('Slot');
    }

    return slot.get({ plain: true });
  }

  async createSlotOrThrow(data: {
    startDateTime: Date;
    endDateTime: Date;
    description: string | null | undefined;
    employeeId: number | null | undefined;
  }): Promise<SlotWithEmployeeType> {
    if (data.employeeId) {
      const employee = await Employee.findByPk(data.employeeId);
      if (!employee) {
        throw new NotFoundError('Employee');
      }
    }

    if (data.endDateTime <= data.startDateTime) {
      throw new ValidationError('endDateTime must be after startDateTime');
    }

    const slot = await Slot.create(data);

    if (!slot) {
      throw new InternalError('Failed to create slot');
    }

    const newId = slot.get('id') as number;

    const createdSlot = await Slot.findByPk(newId, {
      include: [
        {
          association: 'employee',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          include: [
            {
              association: 'roleDetails',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: [
        'id',
        'startDateTime',
        'endDateTime',
        'description',
        'employeeId',
        'createdAt',
        'updatedAt',
      ],
    });

    return createdSlot!.get({ plain: true });
  }

  async updateSlotOrThrow(
    id: number,
    data: Partial<{
      startDateTime: Date | undefined;
      endDateTime: Date | undefined;
      description: string | null | undefined;
      employeeId: number | null | undefined;
    }>,
  ): Promise<SlotWithEmployeeType> {
    const slot = await Slot.findByPk(id);

    if (!slot) {
      throw new NotFoundError('Slot');
    }

    if (data.employeeId) {
      const employee = await Employee.findByPk(data.employeeId);
      if (!employee) {
        throw new NotFoundError('Employee');
      }
    }

    const currentStart = slot.get('startDateTime') as Date;
    const currentEnd = slot.get('endDateTime') as Date;
    const nextStart = data.startDateTime ?? currentStart;
    const nextEnd = data.endDateTime ?? currentEnd;

    if (nextEnd <= nextStart) {
      throw new ValidationError('endDateTime must be after startDateTime');
    }

    await slot.update(data);

    const updatedSlot = await Slot.findByPk(id, {
      include: [
        {
          association: 'employee',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          include: [
            {
              association: 'roleDetails',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: [
        'id',
        'startDateTime',
        'endDateTime',
        'description',
        'employeeId',
        'createdAt',
        'updatedAt',
      ],
    });

    return updatedSlot!.get({ plain: true });
  }

  async deleteSlotOrThrow(id: number): Promise<SlotWithEmployeeType> {
    const slot = await Slot.findByPk(id);

    if (!slot) {
      throw new NotFoundError('Slot');
    }

    await slot.destroy();

    return slot.get({ plain: true });
  }
}
