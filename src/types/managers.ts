import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { units, unitsId } from './units';

export interface managersAttributes {
  id: number;
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export type managersPk = "id";
export type managersId = managers[managersPk];
export type managersOptionalAttributes = "id";
export type managersCreationAttributes = Optional<managersAttributes, managersOptionalAttributes>;

export class managers extends Model<managersAttributes, managersCreationAttributes> implements managersAttributes {
  id!: number;
  cognitoId!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;

  // managers hasMany units via managerId
  units!: units[];
  getUnits!: Sequelize.HasManyGetAssociationsMixin<units>;
  setUnits!: Sequelize.HasManySetAssociationsMixin<units, unitsId>;
  addUnit!: Sequelize.HasManyAddAssociationMixin<units, unitsId>;
  addUnits!: Sequelize.HasManyAddAssociationsMixin<units, unitsId>;
  createUnit!: Sequelize.HasManyCreateAssociationMixin<units>;
  removeUnit!: Sequelize.HasManyRemoveAssociationMixin<units, unitsId>;
  removeUnits!: Sequelize.HasManyRemoveAssociationsMixin<units, unitsId>;
  hasUnit!: Sequelize.HasManyHasAssociationMixin<units, unitsId>;
  hasUnits!: Sequelize.HasManyHasAssociationsMixin<units, unitsId>;
  countUnits!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof managers {
    return managers.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cognitoId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "managers_cognitoId_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'managers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "managers_cognitoId_key",
        unique: true,
        fields: [
          { name: "cognitoId" },
        ]
      },
      {
        name: "managers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
