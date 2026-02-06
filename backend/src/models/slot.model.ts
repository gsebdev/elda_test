import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

import type Employee from './employee.model.js';
import type {
  CreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class Slot extends Model<InferAttributes<Slot>, InferCreationAttributes<Slot>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare slotTemplate: string | null;
  declare startDateTime: Date;
  declare endDateTime: Date;
  declare description: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addEmployees: BelongsToManyAddAssociationsMixin<Employee, number>;
  declare addEmployee: BelongsToManyAddAssociationMixin<Employee, number>;
  declare setEmployees: BelongsToManySetAssociationsMixin<Employee, number>;
  declare getEmployees: BelongsToManyGetAssociationsMixin<Employee>;

  static async createWithEmployees(
    payload: CreationAttributes<Slot>,
    employeeIds: number[] = [],
  ): Promise<Slot> {
    return sequelize.transaction(async (transaction) => {
      const slot = await Slot.create(payload, { transaction });

      if (employeeIds.length > 0) {
        await slot.addEmployees(employeeIds, { transaction });
      }

      return slot;
    });
  }
}

Slot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },

    slotTemplate: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'slot_templates',
        key: 'name',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    tableName: 'slots',
    timestamps: true,
    underscored: true,
  },
);

export default Slot;
