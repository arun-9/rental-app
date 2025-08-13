import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { properties, propertiesId } from './properties';
import type { units, unitsId } from './units';

export interface tenantsAttributes {
  id: number;
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  managerId: number;
  propertyId: number;
}

export type tenantsPk = "id";
export type tenantsId = tenants[tenantsPk];
export type tenantsOptionalAttributes = "id" | "profileImage";
export type tenantsCreationAttributes = Optional<tenantsAttributes, tenantsOptionalAttributes>;

export class tenants extends Model<tenantsAttributes, tenantsCreationAttributes> implements tenantsAttributes {
  id!: number;
  cognitoId!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  profileImage?: string;
  managerId!: number;
  propertyId!: number;

  // tenants belongsTo properties via propertyId
  property!: properties;
  getProperty!: Sequelize.BelongsToGetAssociationMixin<properties>;
  setProperty!: Sequelize.BelongsToSetAssociationMixin<properties, propertiesId>;
  createProperty!: Sequelize.BelongsToCreateAssociationMixin<properties>;
  // tenants hasMany units via tenantId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tenants {
    return tenants.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cognitoId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "tenants_cognitoId_key"
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
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tenants',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tenants_cognitoId_key",
        unique: true,
        fields: [
          { name: "cognitoId" },
        ]
      },
      {
        name: "tenants_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
