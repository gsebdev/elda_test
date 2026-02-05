import Employee from './employee.model.js';
import Role from './role.model.js';
import Slot from './slot.model.js';

Role.hasMany(Employee, {
  foreignKey: 'roleId',
  sourceKey: 'id',
  as: 'employees',
});

Employee.belongsTo(Role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  as: 'roleDetails',
});

Employee.hasMany(Slot, {
  foreignKey: 'employeeId',
  as: 'slots',
});

Slot.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
});
