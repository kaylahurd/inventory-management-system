import React from "react";

function Welcome({ onEnter }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-blue-200">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-800 tracking-tight">
          Welcome to LT Telehealth
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Inventory Management Portal
        </p>
        <button
          onClick={onEnter}
          className="bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}

export default Welcome;
