import Employee from './employee.model.js';
import Role from './role.model.js';

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
