import Employee from './employee.model.js';
import Role from './role.model.js';
import Slot from './slot.model.js';
import SlotAssignation from './slot-assignation.model.js';
import SlotTemplate from './slot-template.model.js';

class ModelAssociations {
  static initialize() {
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

    Employee.belongsToMany(Slot, {
      through: SlotAssignation,
      foreignKey: 'employeeId',
      otherKey: 'slotId',
      as: 'slots',
    });

    Slot.belongsToMany(Employee, {
      through: SlotAssignation,
      foreignKey: 'slotId',
      otherKey: 'employeeId',
      as: 'employees',
    });

    SlotTemplate.hasMany(Slot, {
      foreignKey: 'slotTemplate',
      sourceKey: 'name',
      as: 'slots',
    });

    Slot.belongsTo(SlotTemplate, {
      foreignKey: 'slotTemplate',
      targetKey: 'name',
      as: 'slotTemplateDetails',
    });
  }
}

export default ModelAssociations;
