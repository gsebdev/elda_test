import { sequelize } from '../database/sequelize.js';
import Employee from '../models/employee.model.js';
import Role from '../models/role.model.js';
import Slot from '../models/slot.model.js';
import SlotTemplate from '../models/slot-template.model.js';
import ModelAssociations from '../models/model-associations.js';
import type { InferCreationAttributes } from 'sequelize';

async function seed() {
  ModelAssociations.initialize();

  await Employee.destroy({ where: {} }).catch(() => {});
  await Role.destroy({ where: {} }).catch(() => {});
  await Slot.destroy({ where: {} }).catch(() => {});
  await SlotTemplate.destroy({ where: {} }).catch(() => {});

  await sequelize.sync({ force: true });

  const roles = await Role.bulkCreate([{ name: 'Charpentier' }, { name: 'Menuisier' }]);

  const slotTemplates = await SlotTemplate.bulkCreate([
    { name: 'Matin', startTime: '09:00:00', duration: 180 },
    { name: 'Après-midi', startTime: '14:00:00', duration: 180 },
    { name: 'Soir', startTime: '18:00:00', duration: 180 },
  ]);

  await Employee.bulkCreate([
    {
      firstName: 'Arthur',
      lastName: 'Dupont',
      email: 'arthur.dupont@example.com',
      roleId: roles[0]?.get('id') || 1,
    },
    {
      firstName: 'Samantha',
      lastName: 'Smith',
      email: 'samantha.smith@example.com',
      roleId: roles[1]?.get('id') || 2,
    },
  ]);

  // create slots using slot templates
  const createdEmployees = await Employee.findAll({ attributes: ['id'] });
  const employeeIds = createdEmployees.map((e) => e.get('id') as number);

  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const makeSlotForDay = (
    dayOffset: number,
    template: SlotTemplate,
  ): InferCreationAttributes<Slot> => {
    const startDateTime = new Date();
    startDateTime.setDate(startDateTime.getDate() + dayOffset);

    const [hours, minutes, seconds] = (template.get('startTime') as string)
      .split(':')
      .map((value) => Number(value));

    startDateTime.setHours(hours || 0, minutes || 0, seconds || 0, 0);

    const durationMinutes = template.get('duration') as number;
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

    return {
      title: `Créneau ${template.get('name')} ${String(hours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')}`,
      slotTemplate: template.get('name') as string,
      startDateTime,
      endDateTime,
      description: 'Une description pour ce créneau',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: undefined,
    };
  };

  const slotsToCreate: Array<InferCreationAttributes<Slot>> = [];
  const daysRange = 30; // from today up to one month

  for (const template of slotTemplates) {
    for (let i = 0; i < 5; i += 1) {
      const dayOffset = randomInt(0, daysRange);
      slotsToCreate.push(makeSlotForDay(dayOffset, template));
    }
  }

  const createdSlots: Array<Slot> = [];
  for (const slotData of slotsToCreate) {
    const slot = await Slot.create(slotData);
    createdSlots.push(slot);
  }

  if (employeeIds.length > 0) {
    for (const slot of createdSlots) {
      const employeeCount = randomInt(1, Math.min(2, employeeIds.length));
      const shuffled = [...employeeIds].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, employeeCount);
      await slot.setEmployees(selected);
    }
  }

  await sequelize.close();
  console.log('Seeding completed.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
