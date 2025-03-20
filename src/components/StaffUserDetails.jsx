import React, { useState } from "react";

const StaffUserDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [activeTab, setActiveTab] = useState("all");

  // Sample Data
  const businessUsers = [
    { id: 1, name: "John's Electronics", mobile: "123-456-7890", email: "john@example.com", referredBy: "Mike", plan: "Advance", paidAmount: "$500" },
    { id: 2, name: "Smith's Hardware", mobile: "987-654-3210", email: "smith@example.com", referredBy: "David", plan: "Basic", paidAmount: "$200" },
  ];

  const politicianUsers = [
    { id: 1, name: "Senator James", mobile: "111-222-3333", email: "james@example.com", referredBy: "Party A", plan: "Advance", paidAmount: "$1000" },
    { id: 2, name: "Governor Lisa", mobile: "444-555-6666", email: "lisa@example.com", referredBy: "Party B", plan: "Basic", paidAmount: "$500" },
  ];

  // Get relevant users based on selected category
  const users =
    selectedCategory === "business" ? businessUsers
    : selectedCategory === "politician" ? politicianUsers
    : [...businessUsers, ...politicianUsers];

  // Filter users based on active tab
  const filteredUsers =
    activeTab === "all" ? users
    : users.filter(user => user.plan.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="Form p-6 mt-10 rounded-lg">
      <h2 className="text-3xl text-center font-bold mb-8 text-[#640D5F]" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>User Details</h2>

      {/* Centered Dropdown for Category Selection */}
      <div className="flex justify-center mb-4">
        <select
          aria-label="Select user category"
          className="w-48 p-2 border-2 border-[#640D5F] rounded-md focus:ring-2 focus:ring-[#640D5F] text-sm text-center"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="business">Business User</option>
          <option value="politician">Politician User</option>
        </select>
      </div>

      {/* Tabs for All, Basic, Advance */}
      <div className="flex justify-center gap-2 mb-8 mt-10">
        {["all", "basic", "advance"].map(tab => (
          <button
            aria-label={`Filter by ${tab}`}
            key={tab}
            className={`w-24 h-10 flex items-center justify-center text-sm font-semibold uppercase transition-all duration-300 rounded-md
              ${
                activeTab === tab
                  ? "text-white bg-[#b91bb1] hover:bg-[#fa88f4]" // Active style
                  : "text-[#42093f] bg-[#fddffb] hover:bg-pink-300" // Inactive style
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Field */}
      <input
        type="search"
        placeholder="Search User..."
        className="flex justify-center w-50 p-2 border-2 border-[#640D5F] rounded-md mt-11 mb-4 focus:ring-2 focus:ring-[#640D5F] text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg text-sm">
          <thead className="bg-[#c22aba] text-md text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Referred By</th>
              <th className="p-2 border">Plan</th>
              <th className="p-2 border">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers
                .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(user => (
                  <tr key={user.id} className="hover:bg-gray-100 text-center">
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.mobile}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.referredBy}</td>
                    <td className="p-2 border">{user.plan}</td>
                    <td className="p-2 border">{user.paidAmount}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffUserDetails;