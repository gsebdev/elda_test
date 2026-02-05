import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Slot = sequelize.define(
  'Slot',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },

    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  },
  {
    tableName: 'slots',
    timestamps: true,
    underscored: true,
  },
);

export default Slot;
