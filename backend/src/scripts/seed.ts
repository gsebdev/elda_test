import { sequelize } from '../database/sequelize.js';
import Employee from '../models/employee.model.js';
import Role from '../models/role.model.js';

async function seed() {
  await Employee.destroy({ where: {} }).catch(() => {});
  await Role.destroy({ where: {} }).catch(() => {});

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

  await sequelize.close();
  console.log('Seeding completed.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
