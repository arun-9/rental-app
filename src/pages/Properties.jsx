import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useProperties } from "../context/PropertyContext";

export default function PropertiesManagementPage() {
  const { properties, addProperty, updateProperty, deleteProperty } =
    useProperties();
  const [newProperty, setNewProperty] = useState({ name: "", address: "" });
  const [editingProperty, setEditingProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Unit state management
  const [newUnit, setNewUnit] = useState({ number: "", rent: "", tenant: "" });
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.address) {
      alert("Please fill in all property fields");
      return;
    }
    addProperty(newProperty);
    setNewProperty({ name: "", address: "" });
    setShowPropertyModal(false);
  };

  const handleEditProperty = () => {
    if (!editingProperty.name || !editingProperty.address) {
      alert("Please fill in all property fields");
      return;
    }
    updateProperty(editingProperty);
    setEditingProperty(null);
    setShowPropertyModal(false);
  };

  const handleAddUnit = () => {
    if (!newUnit.number || !newUnit.rent) {
      alert("Please fill in unit number and rent");
      return;
    }

    const propertyToUpdate = properties.find((p) => p.id === activePropertyId);
    if (propertyToUpdate) {
      const updatedProperty = {
        ...propertyToUpdate,
        units: [...propertyToUpdate.units, { ...newUnit, id: Date.now() }]
      };
      updateProperty(updatedProperty);
      setNewUnit({ number: "", rent: "", tenant: "" });
      setShowUnitModal(false);
    }
  };

  const handleEditUnit = () => {
    if (!editingUnit.number || !editingUnit.rent) {
      alert("Please fill in unit number and rent");
      return;
    }

    const propertyToUpdate = properties.find((p) => p.id === activePropertyId);
    if (propertyToUpdate) {
      const updatedProperty = {
        ...propertyToUpdate,
        units: propertyToUpdate.units.map((u) =>
          u.id === editingUnit.id ? editingUnit : u
        )
      };
      updateProperty(updatedProperty);
      setEditingUnit(null);
      setShowUnitModal(false);
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Property
          </button>
        </div>

        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.address}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setEditingProperty(property);
                      setShowPropertyModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this property and all its units?"
                        )
                      ) {
                        deleteProperty(property.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {property.units.map((unit) => (
                  <div
                    key={unit.id}
                    className="border p-3 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Unit {unit.number}</p>
                        <p className="text-sm text-gray-500">
                          Rent: ${unit.rent}
                        </p>
                        {unit.tenant && (
                          <p className="text-sm text-gray-500">
                            Tenant: {unit.tenant}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          onClick={() => {
                            setEditingUnit(unit);
                            setActivePropertyId(property.id);
                            setShowUnitModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => {
                            if (window.confirm("Delete this unit?")) {
                              const updatedProperty = {
                                ...property,
                                units: property.units.filter(
                                  (u) => u.id !== unit.id
                                )
                              };
                              updateProperty(updatedProperty);
                            }
                          }}
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
                    setNewUnit({ number: "", rent: "", tenant: "" });
                    setShowUnitModal(true);
                  }}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Add Unit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Property Modal */}
        {showPropertyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingProperty ? "Edit Property" : "Add Property"}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={
                      editingProperty ? editingProperty.name : newProperty.name
                    }
                    onChange={(e) =>
                      editingProperty
                        ? setEditingProperty({
                            ...editingProperty,
                            name: e.target.value
                          })
                        : setNewProperty({
                            ...newProperty,
                            name: e.target.value
                          })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
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
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => {
                    setEditingProperty(null);
                    setShowPropertyModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={
                    editingProperty ? handleEditProperty : handleAddProperty
                  }
                >
                  {editingProperty ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Unit Modal */}
        {showUnitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingUnit ? "Edit Unit" : "Add Unit"}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editingUnit ? editingUnit.number : newUnit.number}
                    onChange={(e) =>
                      editingUnit
                        ? setEditingUnit({
                            ...editingUnit,
                            number: e.target.value
                          })
                        : setNewUnit({ ...newUnit, number: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rent Amount
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editingUnit ? editingUnit.rent : newUnit.rent}
                    onChange={(e) =>
                      editingUnit
                        ? setEditingUnit({
                            ...editingUnit,
                            rent: e.target.value
                          })
                        : setNewUnit({ ...newUnit, rent: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenant Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editingUnit ? editingUnit.tenant : newUnit.tenant}
                    onChange={(e) =>
                      editingUnit
                        ? setEditingUnit({
                            ...editingUnit,
                            tenant: e.target.value
                          })
                        : setNewUnit({ ...newUnit, tenant: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => {
                    setEditingUnit(null);
                    setShowUnitModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={editingUnit ? handleEditUnit : handleAddUnit}
                >
                  {editingUnit ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
