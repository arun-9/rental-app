// src/context/PropertyContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem("properties");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Greenview Apartments",
            address: "123 Main St, Springfield",
            units: [
              { id: 101, number: "101", rent: "1200", tenant: "" },
              { id: 102, number: "102", rent: "1300", tenant: "" }
            ]
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property) => {
    setProperties((prev) => [
      ...prev,
      { ...property, id: Date.now(), units: [] }
    ]);
  };

  const updateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const value = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

// Corrected export name - changed from usePropertyContext to useProperties
export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}

// Export the context directly if needed
export { PropertyContext };
