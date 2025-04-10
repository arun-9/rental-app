import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function PropertiesManagementPage() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Greenview Apartments",
      address: "123 Main St, Springfield",
      units: [
        { id: 1, number: "101", rent: "1200", tenant: "John Doe" },
        { id: 2, number: "102", rent: "1300", tenant: "Jane Smith" }
      ]
    }
  ]);

  const [newUnit, setNewUnit] = useState({ number: "", rent: "", tenant: "" });
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const [newProperty, setNewProperty] = useState({ name: "", address: "" });
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const resetUnitForm = () => setNewUnit({ number: "", rent: "", tenant: "" });

  const handleAddUnit = (propertyId) => {
    const newUnitWithId = {
      id: Date.now(),
      ...newUnit
      // you can also include propertyId here if needed elsewhere
    };

    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, units: [...p.units, newUnitWithId] } : p
      )
    );

    resetUnitForm();
    setShowUnitModal(false);
  };

  const handleEditUnit = () => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === activePropertyId
          ? {
              ...p,
              units: p.units.map((u) =>
                u.id === editingUnit.id ? { ...editingUnit } : u
              )
            }
          : p
      )
    );
    setEditingUnit(null);
    setShowUnitModal(false);
  };

  const handleDeleteUnit = (propertyId, unitId) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, units: p.units.filter((u) => u.id !== unitId) }
          : p
      )
    );
  };

  const handleAddProperty = () => {
    const newPropertyWithId = {
      id: Date.now(), // or use uuid if preferred
      ...newProperty,
      units: []
    };

    setProperties((prev) => [...prev, newPropertyWithId]);
    setNewProperty({ name: "", address: "" });
    setShowPropertyModal(false);
  };

  const handleEditProperty = () => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === editingProperty.id ? { ...editingProperty } : p
      )
    );
    setEditingProperty(null);
    setShowPropertyModal(false);
  };

  const handleDeleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredUnits = (units) =>
    units.filter(
      (u) =>
        u.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.tenant.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Properties Management</h2>
          <button
            onClick={() => {
              setEditingProperty(null);
              setShowPropertyModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Property
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Unit Number or Tenant"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.address}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditingProperty(property);
                      setShowPropertyModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredUnits(property.units).map((unit) => (
                  <div key={unit.id} className="border p-3 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Unit {unit.number}</p>
                        <p className="text-sm text-gray-500">
                          Rent: ${unit.rent}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tenant: {unit.tenant || "Unassigned"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => {
                            setEditingUnit(unit);
                            setActivePropertyId(property.id);
                            setShowUnitModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteUnit(property.id, unit.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setActivePropertyId(property.id);
                    resetUnitForm();
                    setShowUnitModal(true);
                  }}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Unit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Unit Modal */}
        {showUnitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingUnit ? "Edit Unit" : "Add Unit"}
              </h3>
              <input
                type="text"
                placeholder="Unit Number"
                className="w-full mb-2 p-2 border rounded"
                value={editingUnit ? editingUnit.number : newUnit.number}
                onChange={(e) =>
                  editingUnit
                    ? setEditingUnit({ ...editingUnit, number: e.target.value })
                    : setNewUnit({ ...newUnit, number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Rent Amount"
                className="w-full mb-2 p-2 border rounded"
                value={editingUnit ? editingUnit.rent : newUnit.rent}
                onChange={(e) =>
                  editingUnit
                    ? setEditingUnit({ ...editingUnit, rent: e.target.value })
                    : setNewUnit({ ...newUnit, rent: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tenant Name"
                className="w-full mb-4 p-2 border rounded"
                value={editingUnit ? editingUnit.tenant : newUnit.tenant}
                onChange={(e) =>
                  editingUnit
                    ? setEditingUnit({ ...editingUnit, tenant: e.target.value })
                    : setNewUnit({ ...newUnit, tenant: e.target.value })
                }
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => {
                    setEditingUnit(null);
                    setShowUnitModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() =>
                    editingUnit
                      ? handleEditUnit()
                      : handleAddUnit(activePropertyId)
                  }
                >
                  {editingUnit ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Modal */}
        {showPropertyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingProperty ? "Edit Property" : "Add Property"}
              </h3>
              <input
                type="text"
                placeholder="Property Name"
                className="w-full mb-2 p-2 border rounded"
                value={
                  editingProperty ? editingProperty.name : newProperty.name
                }
                onChange={(e) =>
                  editingProperty
                    ? setEditingProperty({
                        ...editingProperty,
                        name: e.target.value
                      })
                    : setNewProperty({ ...newProperty, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full mb-4 p-2 border rounded"
                value={
                  editingProperty
                    ? editingProperty.address
                    : newProperty.address
                }
                onChange={(e) =>
                  editingProperty
                    ? setEditingProperty({
                        ...editingProperty,
                        address: e.target.value
                      })
                    : setNewProperty({
                        ...newProperty,
                        address: e.target.value
                      })
                }
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => {
                    setEditingProperty(null);
                    setShowPropertyModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() =>
                    editingProperty ? handleEditProperty() : handleAddProperty()
                  }
                >
                  {editingProperty ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
