import React, { useState } from "react";
import { FaSync, FaEdit } from "react-icons/fa"; // Import icons

const AssociatePayoutSetting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [commissionRate, setCommissionRate] = useState("");
  const [billGenerated, setBillGenerated] = useState(false);
  const [defaultCommission, setDefaultCommission] = useState("");
  const [showDefaultCommissionField, setShowDefaultCommissionField] = useState(false);

  const [associates, setAssociates] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "123-456-7890",
      commission: 0,
      users: [
        { id: 101, name: "User A", email: "usera@example.com" },
        { id: 102, name: "User B", email: "userb@example.com" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "987-654-3210",
      commission: 0,
      users: [
        { id: 103, name: "User C", email: "userc@example.com" },
        { id: 104, name: "User D", email: "userd@example.com" },
      ],
    },
  ]);

  // Filter associates based on search term
  const filteredAssociates = associates.filter((associate) =>
    associate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle setting a default commission for all associates
  const handleSetDefaultCommission = () => {
    if (!defaultCommission) {
      alert("Please enter a commission rate.");
      return;
    }

    const updatedAssociates = associates.map((associate) => ({
      ...associate,
      commission: parseFloat(defaultCommission),
    }));

    setAssociates(updatedAssociates);
    setShowDefaultCommissionField(false);
    alert(`All associates' commissions updated to ${defaultCommission}.`);
  };

  // Handle updating individual commission
  const handleUpdateCommission = () => {
    if (!selectedAssociate || !commissionRate) {
      alert("Please select an associate and set a commission rate.");
      return;
    }

    const updatedAssociates = associates.map((a) =>
      a.id === selectedAssociate.id ? { ...a, commission: parseFloat(commissionRate) } : a
    );

    setAssociates(updatedAssociates);
    setBillGenerated(true);
    alert(`Commission updated for ${selectedAssociate.name} to ${commissionRate}.`);

    // Close the "Update Commission" box after updating
    setSelectedAssociate(null);
  };


  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedAssociate(null);
    setCommissionRate("");
    setBillGenerated(false);
    setDefaultCommission("");
    setShowDefaultCommissionField(false);

    // Reset all associates' commissions to their initial state (if needed)
    setAssociates((prevAssociates) =>
      prevAssociates.map((associate) => ({ ...associate }))
    );
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-lg">
      {/* Header with Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#640D5F]">Payout Settings</h2>
        <div className="flex space-x-4">
          {/* Set Default Commission Button */}
          <button
            className="p-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
            onClick={() => setShowDefaultCommissionField(!showDefaultCommissionField)}
          >
            Set Default Commission
          </button>

          {/* Refresh Button */}
          <button
            className="p-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
            onClick={handleRefresh}
            title="Refresh Data" // Tooltip appears on hover
          >
            <FaSync className="text-xl" />
          </button>


        </div>
      </div>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Associate..."
          className="w-100 p-3 border border-gray-600 rounded-lg "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Default Commission Input Field */}
      {showDefaultCommissionField && (
        <div className="flex justify-center">
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-100 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">Set Commission for All</label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Enter default commission"
                className="w-100 p-2 border border-gray-300 rounded-lg"
                value={defaultCommission}
                onChange={(e) => setDefaultCommission(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
                onClick={handleSetDefaultCommission}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Individual Commission Update Form (Now Above Table) */}
      {selectedAssociate && (
        <div className="flex justify-center">
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-100">
            <h3 className="text-lg font-semibold mb-2 text-[#640D5F]">Update Commission</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Associate Name</label>
                <input type="text" value={selectedAssociate.name} className="w-full p-2 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Previous Commission</label>
                <input type="text" value={selectedAssociate.commission} className="w-full p-2 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Commission Rate</label>
                <input
                  type="number"
                  placeholder="Enter commission rate"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
                onClick={handleUpdateCommission}
              >
                Update Commission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Associates Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Associates</h3>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-[#d64fcf] text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Mobile Number</th>
              <th className="p-3 text-center">Commission</th>
              <th className="p-3 text-center">Member Count</th>
              <th className="p-3 text-center">Update Commission</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssociates.length > 0 ? (
              filteredAssociates.map((associate) => (
                <tr key={associate.id} className="hover:bg-gray-50">
                  <td className="p-3 text-center border-b border-gray-200">{associate.name}</td>
                  <td className="p-3 text-center border-b border-gray-200">{associate.mobile}</td>
                  <td className="p-3 text-center border-b border-gray-200">{associate.commission}</td>
                  <td className="p-3 text-center border-b border-gray-200">{associate.users.length}</td>
                  <td className="p-3 text-center border-b border-gray-200">
                    <button
                      className="text-[#8A1C7C] mx-auto rounded-lg transition-all flex items-center"
                      onClick={() => setSelectedAssociate(associate)}
                    >
                      <FaEdit className="ms-10" size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No associates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssociatePayoutSetting;