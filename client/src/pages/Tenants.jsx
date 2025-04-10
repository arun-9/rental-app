import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const properties = [
    {
      id: 1,
      name: "Greenwood Apartments",
      units: [
        { id: 101, name: "Unit A1" },
        { id: 102, name: "Unit A2" }
      ]
    },
    {
      id: 2,
      name: "Sunrise Villas",
      units: [
        { id: 201, name: "Villa B1" },
        { id: 202, name: "Villa B2" }
      ]
    }
  ];

  useEffect(() => {
    setTenants([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        rentDue: "$1200",
        propertyId: "1",
        unitId: "101",
        leaseBegin: "2024-01-01",
        leaseEnd: "2024-12-31"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        rentDue: "$1400",
        propertyId: "2",
        unitId: "202",
        leaseBegin: "2024-03-01",
        leaseEnd: "2025-02-28"
      }
    ]);
  }, []);

  const RemoveTenantButton = ({ tenantId }) => {
    const handleRemove = () =>
      setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));

    return (
      <button onClick={handleRemove} className="text-red-500 hover:underline">
        Remove
      </button>
    );
  };

  const AddTenantModal = ({ onClose }) => {
    const [tenantData, setTenantData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      rentDue: "",
      propertyId: "",
      unitId: "",
      leaseBegin: "",
      leaseEnd: ""
    });

    const availableUnits =
      properties.find((p) => p.id.toString() === tenantData.propertyId)
        ?.units || [];

    const handleAddTenant = () => {
      if (
        !tenantData.firstName ||
        !tenantData.lastName ||
        !tenantData.email ||
        !tenantData.rentDue ||
        !tenantData.propertyId ||
        !tenantData.unitId
      ) {
        alert("Please fill in all fields.");
        return;
      }

      setTenants((prev) => [...prev, { id: Date.now(), ...tenantData }]);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md w-80 sm:w-96">
          <h2 className="text-xl font-semibold mb-4">Add Tenant</h2>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border rounded mb-2"
            value={tenantData.firstName}
            onChange={(e) =>
              setTenantData({ ...tenantData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border rounded mb-2"
            value={tenantData.lastName}
            onChange={(e) =>
              setTenantData({ ...tenantData, lastName: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={tenantData.email}
            onChange={(e) =>
              setTenantData({ ...tenantData, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Rent Due"
            className="w-full p-2 border rounded mb-2"
            value={tenantData.rentDue}
            onChange={(e) =>
              setTenantData({ ...tenantData, rentDue: e.target.value })
            }
          />
          <select
            className="w-full p-2 border rounded mb-2"
            value={tenantData.propertyId}
            onChange={(e) =>
              setTenantData({
                ...tenantData,
                propertyId: e.target.value,
                unitId: ""
              })
            }
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
          <select
            className="w-full p-2 border rounded mb-2"
            value={tenantData.unitId}
            onChange={(e) =>
              setTenantData({ ...tenantData, unitId: e.target.value })
            }
          >
            <option value="">Select Unit</option>
            {availableUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          <label className="text-sm text-gray-700">Lease Begin</label>
          <input
            type="date"
            className="w-full p-2 border rounded mb-2"
            value={tenantData.leaseBegin}
            onChange={(e) =>
              setTenantData({ ...tenantData, leaseBegin: e.target.value })
            }
          />
          <label className="text-sm text-gray-700">Lease End</label>
          <input
            type="date"
            className="w-full p-2 border rounded mb-4"
            value={tenantData.leaseEnd}
            onChange={(e) =>
              setTenantData({ ...tenantData, leaseEnd: e.target.value })
            }
          />
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleAddTenant}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditTenantModal = ({ tenant, onClose }) => {
    const [updatedData, setUpdatedData] = useState({ ...tenant });

    const availableUnits =
      properties.find((p) => p.id.toString() === updatedData.propertyId)
        ?.units || [];

    const handleEditTenant = () => {
      setTenants((prev) =>
        prev.map((t) => (t.id === tenant.id ? updatedData : t))
      );
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md w-80 sm:w-96">
          <h2 className="text-xl font-semibold mb-4">Edit Tenant</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={updatedData.firstName}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={updatedData.lastName}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, lastName: e.target.value })
            }
          />

          <input
            type="email"
            className="w-full p-2 border rounded mb-2"
            value={updatedData.email}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, email: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={updatedData.rentDue}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, rentDue: e.target.value })
            }
          />
          <select
            className="w-full p-2 border rounded mb-2"
            value={updatedData.propertyId}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                propertyId: e.target.value,
                unitId: ""
              })
            }
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
          <select
            className="w-full p-2 border rounded mb-2"
            value={updatedData.unitId}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, unitId: e.target.value })
            }
          >
            <option value="">Select Unit</option>
            {availableUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="w-full p-2 border rounded mb-2"
            value={updatedData.leaseBegin}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, leaseBegin: e.target.value })
            }
          />
          <input
            type="date"
            className="w-full p-2 border rounded mb-4"
            value={updatedData.leaseEnd}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, leaseEnd: e.target.value })
            }
          />
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleEditTenant}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TenantsTable = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Email</th>
            <th className="p-3 text-left">Apartment</th>
            <th className="p-3 text-left">Unit</th>
            <th className="p-3 text-left">Rent Due</th>
            <th className="p-3 text-left">Lease Begin</th>
            <th className="p-3 text-left">Lease End</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => {
            const property = properties.find(
              (p) => p.id.toString() === tenant.propertyId
            );
            const unit = property?.units.find(
              (u) => u.id.toString() === tenant.unitId
            );

            return (
              <tr
                key={tenant.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">
                  {tenant.firstName} {tenant.lastName}
                </td>
                <td className="p-3 hidden sm:table-cell">{tenant.email}</td>
                <td className="p-3">{property?.name || "N/A"}</td>
                <td className="p-3">{unit?.name || "N/A"}</td>
                <td className="p-3">{tenant.rentDue}</td>
                <td className="p-3">{tenant.leaseBegin || "N/A"}</td>
                <td className="p-3">{tenant.leaseEnd || "N/A"}</td>

                <td className="p-3 flex flex-col sm:flex-row gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    Edit
                  </button>
                  <RemoveTenantButton tenantId={tenant.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedTenant && (
        <EditTenantModal
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col md:flex-row flex-1 gap-4 p-4 md:p-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Tenant
          </button>
          <TenantsTable />
        </div>
      </div>

      {isAddModalOpen && (
        <AddTenantModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

export default Tenants;
