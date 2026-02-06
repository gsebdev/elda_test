import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

import type { InferAttributes, InferCreationAttributes } from 'sequelize';

class SlotAssignation extends Model<
  InferAttributes<SlotAssignation>,
  InferCreationAttributes<SlotAssignation>
> {
  declare slotId: number;
  declare employeeId: number;
}

SlotAssignation.init(
  {
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slots',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'slot_assignations',
    timestamps: false,
    underscored: true,
  },
);

export default SlotAssignation;
