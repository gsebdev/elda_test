import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

class SlotTemplate extends Model<
  InferAttributes<SlotTemplate>,
  InferCreationAttributes<SlotTemplate>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare startTime: string;
  declare duration: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SlotTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100],
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'slot_templates',
    timestamps: true,
    underscored: true,
  },
);

export default SlotTemplate;
