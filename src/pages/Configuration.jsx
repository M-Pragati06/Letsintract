import React, { useState } from "react";

const Configuration = () => {
  const [apiKeys, setApiKeys] = useState({
    whatsapp: { key: "", authKey: "", channel: "" },
    sms: { key: "", senderId: "", channel: "", dcs: "" },
    apiUrl: { key: "", spiKey: "" },
  });

  const [customers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [messageType, setMessageType] = useState("WhatsApp");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowDropdown(true);

    if (!query) {
      setSelectedCustomer(null); // Remove selected customer when search is cleared
    }

    setFilteredCustomers(
      customers.filter((customer) => customer.name.toLowerCase().includes(query))
    );
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(customer.name);
    setShowDropdown(false);
  };

  const handleInputChange = (e, type, field) => {
    setApiKeys({
      ...apiKeys,
      [type]: { ...apiKeys[type], [field]: e.target.value },
    });
  };

  const handleSave = () => {
    if (!selectedCustomer) {
      alert("Please select a customer first!");
      return;
    }
    console.log(`Assigned API Keys to ${selectedCustomer.name}:`, apiKeys);
    alert(`API Keys assigned to ${selectedCustomer.name} successfully!`);
  };

  return (
    <div className="Form mt-8 p-6 max-w-3xl mx-auto shadow-md rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-[#640D5F] text-center mb-4" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)"}}>Configuration</h1>

      {/* Search for Customer */}
      <div className="mb-4 relative">
        <label className="block text-[#4e0c4a] font-semibold">Search Customer</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Type to search..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && searchQuery && (
          <ul className="absolute w-full bg-[#ebace8] border mt-1 rounded-lg shadow-lg z-10">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <li
                  key={customer.id}
                  className="p-2 cursor-pointer hover:bg-[#c790c4]"
                  onClick={() => selectCustomer(customer)}
                >
                  {customer.name}
                </li>
              ))
            ) : (
              <li className="p-2">No customers found</li>
            )}
          </ul>
        )}
      </div>

      {/* Selected Customer Info */}
      {selectedCustomer && (
        <div className="mb-4 p-3 border rounded-lg bg-gray-100">
          <p className="font-semibold">Selected Customer:</p>
          <p className="text-blue-600">{selectedCustomer.name}</p>
        </div>
      )}

      {/* Toggle Switch for Message Type */}
      <div className="flex items-center justify-center bg-[#ebace8] rounded-full p-1 w-full max-w-lg mx-auto mb-6">
        {["WhatsApp", "SMS", "API URL"].map((type) => (
          <div
            key={type}
            className={`flex-1 text-center py-2 rounded-full cursor-pointer transition-all font-semibold text-lg ${
              messageType === type ? "bg-[#640D5F] text-white" : "text-black"
            }`}
            onClick={() => setMessageType(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* WhatsApp Section */}
      {messageType === "WhatsApp" && (
        <div>
          <label className="block font-semibold">WhatsApp API Key</label>
          <input
            type="text"
            value={apiKeys.whatsapp.key}
            onChange={(e) => handleInputChange(e, "whatsapp", "key")}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold">API Auth Key</label>
          <input
            type="text"
            value={apiKeys.whatsapp.authKey}
            onChange={(e) => handleInputChange(e, "whatsapp", "authKey")}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold">Channel Number</label>
          <input
            type="text"
            value={apiKeys.whatsapp.channel}
            onChange={(e) => handleInputChange(e, "whatsapp", "channel")}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      )}

      {/* SMS Section */}
      {messageType === "SMS" && (
        <div>
          <label className="block font-semibold">SMS API Key</label>
          <input
            type="text"
            value={apiKeys.sms.key}
            onChange={(e) => handleInputChange(e, "sms", "key")}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold">Sender ID</label>
          <input
            type="text"
            value={apiKeys.sms.senderId}
            onChange={(e) => handleInputChange(e, "sms", "senderId")}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold">Channel</label>
          <input
            type="text"
            value={apiKeys.sms.channel}
            onChange={(e) => handleInputChange(e, "sms", "channel")}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold">DCS</label>
          <input
            type="text"
            value={apiKeys.sms.dcs}
            onChange={(e) => handleInputChange(e, "sms", "dcs")}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      )}

      {/* API URL Section */}
      {messageType === "API URL" && (
        <div>
          <label className="block font-semibold">API Key</label>
          <input
            type="text"
            value={apiKeys.apiUrl.key}
            onChange={(e) => handleInputChange(e, "apiUrl", "key")}
            className="w-full p-3 border rounded-lg mb-4"
          />

         
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center w-full mt-6">
        <button
          onClick={handleSave}
          className="w-40 bg-[#98188f] text-white p-3 rounded-lg font-bold hover:bg-[#4e0c4a] transition duration-200"
        >
          Assign API Keys
        </button>
      </div>
    </div>
  );
};

export default Configuration;