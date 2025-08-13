import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tenants, tenantsId } from './tenants';
import type { units, unitsId } from './units';

export interface propertiesAttributes {
  id: number;
  name: string;
  address: string;
  thumbnail?: string;
  managerId: number;
}

export type propertiesPk = "id";
export type propertiesId = properties[propertiesPk];
export type propertiesOptionalAttributes = "id" | "thumbnail";
export type propertiesCreationAttributes = Optional<propertiesAttributes, propertiesOptionalAttributes>;

export class properties extends Model<propertiesAttributes, propertiesCreationAttributes> implements propertiesAttributes {
  id!: number;
  name!: string;
  address!: string;
  thumbnail?: string;
  managerId!: number;

  // properties hasMany tenants via propertyId
  tenants!: tenants[];
  getTenants!: Sequelize.HasManyGetAssociationsMixin<tenants>;
  setTenants!: Sequelize.HasManySetAssociationsMixin<tenants, tenantsId>;
  addTenant!: Sequelize.HasManyAddAssociationMixin<tenants, tenantsId>;
  addTenants!: Sequelize.HasManyAddAssociationsMixin<tenants, tenantsId>;
  createTenant!: Sequelize.HasManyCreateAssociationMixin<tenants>;
  removeTenant!: Sequelize.HasManyRemoveAssociationMixin<tenants, tenantsId>;
  removeTenants!: Sequelize.HasManyRemoveAssociationsMixin<tenants, tenantsId>;
  hasTenant!: Sequelize.HasManyHasAssociationMixin<tenants, tenantsId>;
  hasTenants!: Sequelize.HasManyHasAssociationsMixin<tenants, tenantsId>;
  countTenants!: Sequelize.HasManyCountAssociationsMixin;
  // properties hasMany units via propertyId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof properties {
    return properties.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'properties',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "properties_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
