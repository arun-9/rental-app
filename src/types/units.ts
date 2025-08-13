import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { managers, managersId } from './managers';
import type { properties, propertiesId } from './properties';
import type { tenants, tenantsId } from './tenants';

export interface unitsAttributes {
  id: number;
  unitNumber: string;
  status: "Vacant" | "Occupied";
  propertyId: number;
  tenantId?: number;
  managerId: number;
}

export type unitsPk = "id";
export type unitsId = units[unitsPk];
export type unitsOptionalAttributes = "id" | "tenantId";
export type unitsCreationAttributes = Optional<unitsAttributes, unitsOptionalAttributes>;

export class units extends Model<unitsAttributes, unitsCreationAttributes> implements unitsAttributes {
  id!: number;
  unitNumber!: string;
  status!: "Vacant" | "Occupied";
  propertyId!: number;
  tenantId?: number;
  managerId!: number;

  // units belongsTo managers via managerId
  manager!: managers;
  getManager!: Sequelize.BelongsToGetAssociationMixin<managers>;
  setManager!: Sequelize.BelongsToSetAssociationMixin<managers, managersId>;
  createManager!: Sequelize.BelongsToCreateAssociationMixin<managers>;
  // units belongsTo properties via propertyId
  property!: properties;
  getProperty!: Sequelize.BelongsToGetAssociationMixin<properties>;
  setProperty!: Sequelize.BelongsToSetAssociationMixin<properties, propertiesId>;
  createProperty!: Sequelize.BelongsToCreateAssociationMixin<properties>;
  // units belongsTo tenants via tenantId
  tenant!: tenants;
  getTenant!: Sequelize.BelongsToGetAssociationMixin<tenants>;
  setTenant!: Sequelize.BelongsToSetAssociationMixin<tenants, tenantsId>;
  createTenant!: Sequelize.BelongsToCreateAssociationMixin<tenants>;

  static initModel(sequelize: Sequelize.Sequelize): typeof units {
    return units.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    unitNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("Vacant","Occupied"),
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      }
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tenants',
        key: 'id'
      }
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'managers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'units',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "units_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
