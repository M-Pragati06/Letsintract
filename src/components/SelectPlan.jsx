import React, { useState } from "react";
import './application.css';

const SelectPlan = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Basic");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    { name: "John Doe", email: "john@example.com", mobile: "9876543210", state: "California", district: "Los Angeles", taluka: "Central" },
    { name: "Jane Smith", email: "jane@example.com", mobile: "9123456789", state: "New York", district: "Manhattan", taluka: "Downtown" },
    { name: "Alice Johnson", email: "alice@example.com", mobile: "9988776655", state: "Texas", district: "Houston", taluka: "West Side" },
    { name: "Bob Brown", email: "bob@example.com", mobile: "8877665544", state: "Florida", district: "Miami", taluka: "South Beach" },
  ];

  const durations = ["1 Month", "2 Months", "3 Months", "6 Months", "1 Year"];

  const plans = {
    Basic: {
      "1 Month": { price: "$10", features: ["✔ 5GB Storage", "✔ Email Support"] },
      "2 Months": { price: "$18", features: ["✔ 10GB Storage", "✔ Email & Chat Support"] },
      "3 Months": { price: "$25", features: ["✔ 15GB Storage", "✔ Email, Chat & Phone Support"] },
      "6 Months": { price: "$45", features: ["✔ 30GB Storage", "✔ Priority Support"] },
      "1 Year": { price: "$80", features: ["✔ 50GB Storage", "✔ 24/7 Priority Support"] },
    },
    Advanced: {
      "1 Month": { price: "$20", features: ["✔ 50GB Storage", "✔ Advanced Analytics"] },
      "2 Months": { price: "$38", features: ["✔ 100GB Storage", "✔ AI-powered Reports"] },
      "3 Months": { price: "$55", features: ["✔ 200GB Storage", "✔ Custom Integrations"] },
      "6 Months": { price: "$100", features: ["✔ 500GB Storage", "✔ VIP Support"] },
      "1 Year": { price: "$180", features: ["✔ 1TB Storage", "✔ Dedicated Account Manager"] },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedDuration) {
      alert("Please select a customer and plan duration.");
      return;
    }
    alert(
      `Plan "${selectedCategory} - ${selectedDuration}" selected for ${selectedCustomer.name} at ${plans[selectedCategory][selectedDuration].price}`
    );
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobile.includes(searchTerm)
  );

  return (
    <div className="Form mx-auto mt-10 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#640D5F] text-center" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>
        Select Plan
      </h2>

      {/* Search Bar & User Details Card in a Flexbox */}
      <div className="">
        {/* Search and Dropdown */}
        <div className="relative w-1/2 mx-auto">
          <input
            type="search"
            placeholder="Search User by Name or Mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md text-[#4e0c4a] border border-[#640D5F]"
          />
          {searchTerm && (
            <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setSearchTerm(""); // Hide suggestions after selection
                  }}
                >
                  {customer.name} ({customer.mobile})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Details Card */}
        {selectedCustomer && (
          <div className="w-1/3 bg-white rounded-xl p-6 mx-auto my-5" style={{boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#aa1ba3] to-[#640D5F] text-white text-center py-2 rounded-lg">
              <h3 className="text-lg font-semibold">User Details</h3>
            </div>

            {/* User Info - Well-Formatted Table Structure */}
            <div className="p-4 text-gray-700">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span>{selectedCustomer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Mobile No.:</span>
                  <span>{selectedCustomer.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">State:</span>
                  <span>{selectedCustomer.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">District:</span>
                  <span>{selectedCustomer.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Taluka:</span>
                  <span>{selectedCustomer.taluka}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan Toggle */}
      <div className="flex items-center justify-center bg-[#ebace8] rounded-full p-1 w-full max-w-md mx-auto mt-4">
        {["Basic", "Advanced"].map((category) => (
          <div
            key={category}
            className={`flex-1 text-center py-2 rounded-full cursor-pointer transition-all font-semibold text-lg ${
              selectedCategory === category ? "bg-[#640D5F] text-white" : "text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Duration Selection Cards */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        {durations.map((duration) => (
          <div
            key={duration}
            className={`p-6 rounded-lg shadow-md border cursor-pointer transition-all text-center ${
              selectedDuration === duration ? "bg-[#f5a9ef]" : "bg-[#f8e1f6] hover:bg-[#f1c0ee]"
            }`}
            onClick={() => setSelectedDuration(duration)}
          >
            <h3 className="text-lg text-blue-800 font-bold">{duration}</h3>
            <p className="text-[#4e0c4a] text-lg font-semibold">{plans[selectedCategory][duration].price}</p>
            <ul className="mt-2 text-sm">
              {plans[selectedCategory][duration].features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center w-full">
        <button
          onClick={handleSubmit}
          className="w-40 bg-[#aa1ba3] hover:bg-[#640D5F] font-bold text-white p-2 mt-5 rounded-md"
        >
          Confirm Plan
        </button>
      </div>
    </div>
  );
};

export default SelectPlan;