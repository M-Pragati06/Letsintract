import React, { useState, useEffect } from "react";

const Notification = () => {
  const [expiringCustomers, setExpiringCustomers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("business");

  // Dummy data for Business and Politician customers
  const businessCustomers = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "9876543210", expiryDate: "2025-03-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "9876543211", expiryDate: "2025-03-25" },
    { id: 3, name: "Alice Green", email: "alice@example.com", mobile: "9876543214", expiryDate: "2025-04-15" },
    { id: 4, name: "Robert Black", email: "robert@example.com", mobile: "9876543215", expiryDate: "2025-05-05" },
  ];

  const politicianCustomers = [
    { id: 5, name: "Michael Brown", email: "michael@example.com", mobile: "9876543212", expiryDate: "2025-03-12" },
    { id: 6, name: "Emily White", email: "emily@example.com", mobile: "9876543213", expiryDate: "2025-03-28" },
    { id: 7, name: "David Clark", email: "david@example.com", mobile: "9876543216", expiryDate: "2025-04-20" },
    { id: 8, name: "Sophia Miller", email: "sophia@example.com", mobile: "9876543217", expiryDate: "2025-06-10" },
  ];

  useEffect(() => {
    const today = new Date();
    const customers = selectedCategory === "business" ? businessCustomers : politicianCustomers;
    const upcomingExpirations = customers.filter((customer) => {
      const expiryDate = new Date(customer.expiryDate);
      return expiryDate >= today;
    });

    setExpiringCustomers(upcomingExpirations);
  }, [selectedCategory]);

  // Function to determine expiry date color
  const getExpiryColor = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    const daysRemaining = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 7) return "text-red-500 font-bold"; // Urgent (red)
    if (daysRemaining <= 30) return "text-yellow-500 font-semibold"; // Warning (yellow)
    return "text-green-500 font-medium"; // Safe (green)
  };

  return (
    <div className="Form p-6 mx-auto rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-[#640D5F] mb-4" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)"}}>Expiring Plans</h1>
      
      {/* Dropdown for category selection */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-semibold">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="business">Business</option>
          <option value="politician">Politician</option>
        </select>
      </div>

      {expiringCustomers.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#b017a8] text-white uppercase text-sm leading-normal">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Mobile</th>
              <th className="border p-3 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {expiringCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#f1d5ef]">
                <td className="border p-3">{customer.name}</td>
                <td className="border p-3">{customer.email}</td>
                <td className="border p-3">{customer.mobile}</td>
                <td className={`border p-3 ${getExpiryColor(customer.expiryDate)}`}>{customer.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center">No expiring plans found.</p>
      )}
    </div>
  );
};

export default Notification;