import { InternalError, NotFoundError, ValidationError } from '../errors/internal-errors.js';
import Employee from '../models/employee.model.js';
import SlotTemplate from '../models/slot-template.model.js';
import Slot from '../models/slot.model.js';
import type { CreateSlotType, SlotWithEmployeeType } from './types/slot.type.js';

export class SlotService {
  async getAllSlots(): Promise<SlotWithEmployeeType[]> {
    const slots = await Slot.findAll({
      include: [
        {
          association: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: [] },
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
        'title',
        'slotTemplate',
        'startDateTime',
        'endDateTime',
        'description',
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
          association: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: [] },
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
        'title',
        'slotTemplate',
        'startDateTime',
        'endDateTime',
        'description',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!slot) {
      throw new NotFoundError('Slot');
    }

    return slot.get({ plain: true });
  }

  async createSlotOrThrow(data: CreateSlotType): Promise<SlotWithEmployeeType> {
    const newSlot = {
      title: data.title,
      slotTemplate: data.slotTemplate ?? null,
      description: data.description ?? null,
      startDateTime: undefined as unknown as Date,
      endDateTime: undefined as unknown as Date,
    };

    if (data.employeeIds && data.employeeIds.length > 0) {
      const employees = await Employee.findAll({
        where: { id: data.employeeIds },
        attributes: ['id'],
      });

      if (employees.length !== data.employeeIds.length) {
        throw new NotFoundError('Employee');
      }
    }

    if (!data.endDateTime) {
      if (data.slotTemplate === null || !data.startDateTime) {
        throw new ValidationError(
          'startDateTime and slotTemplate are required when endDateTime is not provided',
        );
      }

      const slotTemplate = await SlotTemplate.findOne({
        where: { name: data.slotTemplate },
        attributes: ['startTime', 'duration'],
      });

      if (!slotTemplate) {
        throw new NotFoundError('SlotTemplate');
      }

      const startTime = slotTemplate.get('startTime') as string;
      const duration = slotTemplate.get('duration') as number;

      const startDateTime = new Date(data.startDateTime);
      const [hours, minutes, seconds] = startTime.split(':').map((part) => Number(part));
      startDateTime.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0);

      const endDateTime = new Date(startDateTime.getTime() + duration * 60000); // duration is in minutes

      newSlot.startDateTime = startDateTime;
      newSlot.endDateTime = endDateTime;
    } else if (data.endDateTime && !data.startDateTime) {
      throw new ValidationError(
        'startDateTime and endDateTime are required when endDateTime is provided',
      );
    } else {
      newSlot.startDateTime = data.startDateTime;
      newSlot.endDateTime = data.endDateTime;
    }

    if (newSlot.endDateTime <= newSlot.startDateTime) {
      throw new ValidationError('endDateTime must be after startDateTime');
    }

    const employeeIds = data.employeeIds ?? [];

    const slot = await Slot.createWithEmployees(newSlot, employeeIds);

    if (!slot) {
      throw new InternalError('Failed to create slot');
    }

    const newId = slot.get('id') as number;

    const createdSlot = await Slot.findByPk(newId, {
      include: [
        {
          association: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: [] },
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
        'title',
        'startDateTime',
        'endDateTime',
        'slotTemplate',
        'description',
        'createdAt',
        'updatedAt',
      ],
    });

    return createdSlot!.get({ plain: true });
  }

  async updateSlotOrThrow(
    id: number,
    data: Partial<{
      title: string | undefined;
      startDateTime: Date | undefined;
      endDateTime: Date | undefined;
      description: string | null | undefined;
      employeeIds: number[] | undefined;
    }>,
  ): Promise<SlotWithEmployeeType> {
    const slot = await Slot.findByPk(id);

    if (!slot) {
      throw new NotFoundError('Slot');
    }

    if (data.employeeIds) {
      const employees = await Employee.findAll({
        where: { id: data.employeeIds },
        attributes: ['id'],
      });

      if (employees.length !== data.employeeIds.length) {
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

    const updateData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );

    await slot.update(updateData);

    if (data.employeeIds) {
      await slot.setEmployees(data.employeeIds);
    }

    const updatedSlot = await Slot.findByPk(id, {
      include: [
        {
          association: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: [] },
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
        'title',
        'startDateTime',
        'endDateTime',
        'description',
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
