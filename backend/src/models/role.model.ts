import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

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

export default Role;
