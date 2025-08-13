import type { Sequelize } from "sequelize";
import { managers as _managers } from "./managers";
import type { managersAttributes, managersCreationAttributes } from "./managers";
import { properties as _properties } from "./properties";
import type { propertiesAttributes, propertiesCreationAttributes } from "./properties";
import { tenants as _tenants } from "./tenants";
import type { tenantsAttributes, tenantsCreationAttributes } from "./tenants";
import { units as _units } from "./units";
import type { unitsAttributes, unitsCreationAttributes } from "./units";

export {
  _managers as managers,
  _properties as properties,
  _tenants as tenants,
  _units as units,
};

export type {
  managersAttributes,
  managersCreationAttributes,
  propertiesAttributes,
  propertiesCreationAttributes,
  tenantsAttributes,
  tenantsCreationAttributes,
  unitsAttributes,
  unitsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const managers = _managers.initModel(sequelize);
  const properties = _properties.initModel(sequelize);
  const tenants = _tenants.initModel(sequelize);
  const units = _units.initModel(sequelize);

  units.belongsTo(managers, { as: "manager", foreignKey: "managerId"});
  managers.hasMany(units, { as: "units", foreignKey: "managerId"});
  tenants.belongsTo(properties, { as: "property", foreignKey: "propertyId"});
  properties.hasMany(tenants, { as: "tenants", foreignKey: "propertyId"});
  units.belongsTo(properties, { as: "property", foreignKey: "propertyId"});
  properties.hasMany(units, { as: "units", foreignKey: "propertyId"});
  units.belongsTo(tenants, { as: "tenant", foreignKey: "tenantId"});
  tenants.hasMany(units, { as: "units", foreignKey: "tenantId"});

  return {
    managers: managers,
    properties: properties,
    tenants: tenants,
    units: units,
  };
}
