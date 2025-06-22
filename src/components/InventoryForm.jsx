import React, { useState } from "react";
import inventoryData from "../data/inventoryData";

function InventoryForm({ onSubmit }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submittedItems, setSubmittedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name: selectedItem, quantity: parseInt(quantity) || 1 };
    const updated = [...submittedItems, newItem];

    setSubmittedItems(updated);
    setSelectedItem("");
    setQuantity("");
    onSubmit(updated); // send to App
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select an item:</label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select --</option>
            {Object.entries(inventoryData).map(([category, items]) =>
              category !== "hiddenItems" ? (
                <optgroup key={category} label={category.toUpperCase()}>
                  {items.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ) : null
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || /^[0-9]+$/.test(val)) {
                setQuantity(val);
              }
            }}
            className="w-full p-2 border rounded"
            placeholder="Enter quantity"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Summary
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;
