import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';
import Employee from './employee.model.js';

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
    underscored: true,
  },
);

Role.hasMany(Employee, {
  foreignKey: 'roleId',
  sourceKey: 'id',
  as: 'employees',
});

export default Role;
