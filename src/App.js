import React, { useEffect, useState } from "react";
import InventoryForm from "./components/InventoryForm";
import Welcome from "./components/Welcome";
import Auth from "./components/Auth";
import supabase from "./supabaseClient";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const categories = {
  "Laptops (Models)": ["E15", "E590", "E595", "Dell Lat. 3520", "Dell Lat. 3540"],
  Peripherals: [
    "Monitor", "Rad Monitor", "Speaker", "Webcam", "Mouse", "Keyboard (Amazon) (Logitech)",
    "USB Hub", "Rad USB Hub", "Ethernet Cable", "Monitor Power Cables",
    "Dell Laptop Charger (65W - Type C)", "Old Dell Laptop Charger (65W - Needle)",
    "Lenovo Laptop Charger (65W - Type C)", "HDMI USB adapter", "Studio Headphones"
  ],
  "Shipping Supplies": [
    "22 x 18 x 10 Boxes (L)", "20 x 14 x 6 Boxes (S)", "Tape Rolls", "Kraft Paper Rolls",
    "FedEx Shipping Pouches - Small", "Black Poly Bubble Mailers",
    "Large Label Rolls - 2.25” x 1.25”", "Small Label Rolls - 1” x 1”"
  ],
  "Cleaning Supplies": [
    "PC Duster", "Disinfecting Wipes - packs", "Microfiber Cloths",
    "Screen Spray", "Gloves - Box"
  ]
};

const defaultQuantities = {
  E15: { min: 10, count: 0 }, E590: { min: 9, count: 0 }, E595: { min: 10, count: 0 },
  "Dell Lat. 3520": { min: 0, count: 0 }, "Dell Lat. 3540": { min: 0, count: 0 },
  Monitor: { min: 6, count: 0 }, "Rad Monitor": { min: 6, count: 0 }, Speaker: { min: 15, count: 0 },
  Webcam: { min: 15, count: 0 }, Mouse: { min: 15, count: 0 },
  "Keyboard (Amazon) (Logitech)": { min: 15, count: 0 }, "USB Hub": { min: 20, count: 0 },
  "Rad USB Hub": { min: 10, count: 0 }, "Ethernet Cable": { min: 13, count: 0 },
  "Monitor Power Cables": { min: 9, count: 0 },
  "Dell Laptop Charger (65W - Type C)": { min: 13, count: 0 },
  "Old Dell Laptop Charger (65W - Needle)": { min: 9, count: 0 },
  "Lenovo Laptop Charger (65W - Type C)": { min: 13, count: 0 },
  "HDMI USB adapter": { min: 1, count: 0 }, "Studio Headphones": { min: 1, count: 0 },
  "22 x 18 x 10 Boxes (L)": { min: 25, count: 0 }, "20 x 14 x 6 Boxes (S)": { min: 25, count: 0 },
  "Tape Rolls": { min: 8, count: 0 }, "Kraft Paper Rolls": { min: 2, count: 0 },
  "FedEx Shipping Pouches - Small": { min: 50, count: 0 },
  "Black Poly Bubble Mailers": { min: 50, count: 0 },
  "Large Label Rolls - 2.25” x 1.25”": { min: 2, count: 0 },
  "Small Label Rolls - 1” x 1”": { min: 3, count: 0 },
  "PC Duster": { min: 1.5, count: 0 }, "Disinfecting Wipes - packs": { min: 2, count: 0 },
  "Microfiber Cloths": { min: 25, count: 0 }, "Screen Spray": { min: 2, count: 0 },
  "Gloves - Box": { min: 2, count: 0 }
};

function App() {
  const [user, setUser] = useState(null);
  const [entered, setEntered] = useState(false);
  const [summary, setSummary] = useState([]);
  const [tab, setTab] = useState("current");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) setUser(data.session.user);
    };
    getSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const handleEdit = (item, field, value) => {
    setSummary((prev) =>
      prev.some((row) => row.name === item)
        ? prev.map((row) =>
            row.name === item ? { ...row, [field]: Number(value) } : row
          )
        : [...prev, { name: item, [field]: Number(value) }]
    );
  };

  const exportToExcel = () => {
    const today = new Date();
    const dateStr = format(today, "yyyy-MM-dd");
    const wb = XLSX.utils.book_new();
    const data = [];

    const leftBox = [[`LT Telehealth Inventory Summary - ${dateStr}`, "", ""]];
    const rightBox = [["Damaged Items - DNI", "", ""]];
    leftBox.push(["Item", "Min.", "Count"]);
    rightBox.push(["Item", "Count", "Reason"]);

    for (const [category, items] of Object.entries(categories)) {
      leftBox.push([category]);
      leftBox.push(["Item", "Min.", "Count"]);
      items.forEach((item) => {
        const match = summary.find((row) => row.name === item);
        const fallback = defaultQuantities[item] || { min: 0, count: 0 };
        const min = match?.min ?? fallback.min;
        const count = match?.quantity ?? fallback.count;
        leftBox.push([item, min, count]);
        rightBox.push(["", "", ""]);
      });
      leftBox.push([""]); rightBox.push([""]);
    }

    for (let i = 0; i < leftBox.length; i++) {
      data.push([...(leftBox[i] || []), "", ...(rightBox[i] || [])]);
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [
      { wch: 34 }, { wch: 10 }, { wch: 10 },
      {},
      { wch: 34 }, { wch: 10 }, { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `lt_inventory_summary_${dateStr}.xlsx`);
  };

  if (!user) return <Auth onLogin={setUser} />;
  if (!entered) return <Welcome onEnter={() => setEntered(true)} />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="bg-white shadow-md rounded-xl p-4 mb-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700">LT Inventory Tracker</h1>
        <span className="text-sm text-gray-500">Logged in as: {user.email}</span>
      </header>

      <main className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setTab("current")}
            className={`px-4 py-2 rounded ${tab === "current" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >Current Summary</button>
          <button
            onClick={() => setTab("past")}
            className={`px-4 py-2 rounded ${tab === "past" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >Past Summaries</button>
        </div>

        {tab === "current" && (
          <>
            <InventoryForm onSubmit={setSummary} />
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
                <button
                  onClick={exportToExcel}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >Export Excel</button>
              </div>
              {Object.entries(categories).map(([cat, items]) => (
                <div key={cat} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{cat}</h3>
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Item</th>
                        <th className="p-2 text-left">Min.</th>
                        <th className="p-2 text-left">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        const match = summary.find((s) => s.name === item);
                        const min = match?.min ?? defaultQuantities[item]?.min ?? 0;
                        const count = match?.quantity ?? defaultQuantities[item]?.count ?? 0;
                        return (
                          <tr key={item}>
                            <td className="p-2 border">{item}</td>
                            <td className="p-2 border">
                              <input
                                type="number"
                                className="w-20 border rounded px-2"
                                value={min}
                                onChange={(e) => handleEdit(item, "min", e.target.value)}
                              />
                            </td>
                            <td className="p-2 border">
                              <input
                                type="number"
                                className="w-20 border rounded px-2"
                                value={count}
                                onChange={(e) => handleEdit(item, "quantity", e.target.value)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "past" && (
          <div className="text-gray-500 text-sm">Past summaries will go here once Supabase integration is enabled.</div>
        )}
      </main>
    </div>
  );
}

export default App;
