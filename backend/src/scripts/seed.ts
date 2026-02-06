import { sequelize } from '../database/sequelize.js';
import Employee from '../models/employee.model.js';
import Role from '../models/role.model.js';
import Slot from '../models/slot.model.js';

async function seed() {
  await Employee.destroy({ where: {} }).catch(() => {});
  await Role.destroy({ where: {} }).catch(() => {});
  await Slot.destroy({ where: {} }).catch(() => {});

  await sequelize.sync({ force: true });

  const roles = await Role.bulkCreate([{ name: 'Charpentier' }, { name: 'Menuisier' }]);

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

  // create 10 slots: 5 mornings (09:00-12:00) and 5 afternoons (14:00-17:00)
  const createdEmployees = await Employee.findAll({ attributes: ['id'] });
  const employeeIds = createdEmployees.map((e) => e.get('id') as number);

  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const makeSlotForDay = (dayOffset: number, startHour: number, endHour: number, employeeId?: number | null) => {
    const start = new Date();
    start.setDate(start.getDate() + dayOffset);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(start);
    end.setHours(endHour, 0, 0, 0);

    return {
      startDateTime: start,
      endDateTime: end,
      description: 'Auto-generated slot',
      employeeId: employeeId ?? null,
    };
  };

  const slotsToCreate: Array<Record<string, unknown>> = [];
  const daysRange = 30; // from today up to one month

  // 5 morning slots (9-12)
  for (let i = 0; i < 5; i += 1) {
    const dayOffset = randomInt(0, daysRange);
    const employeeId = employeeIds.length ? employeeIds[randomInt(0, employeeIds.length - 1)] : null;
    slotsToCreate.push(makeSlotForDay(dayOffset, 9, 12, employeeId));
  }

  // 5 afternoon slots (14-17)
  for (let i = 0; i < 5; i += 1) {
    const dayOffset = randomInt(0, daysRange);
    const employeeId = employeeIds.length ? employeeIds[randomInt(0, employeeIds.length - 1)] : null;
    slotsToCreate.push(makeSlotForDay(dayOffset, 14, 17, employeeId));
  }

  await Slot.bulkCreate(slotsToCreate as any[]);

  await sequelize.close();
  console.log('Seeding completed.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
