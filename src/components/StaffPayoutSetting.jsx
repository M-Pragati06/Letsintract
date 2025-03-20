import React, { useState } from "react";
import { FaSync, FaEdit } from "react-icons/fa"; // Import icons

const StaffPayoutSetting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [incentiveRate, setIncentiveRate] = useState("");
  const [billGenerated, setBillGenerated] = useState(false);
  const [defaultIncentive, setDefaultIncentive] = useState("");
  const [showDefaultIncentiveField, setShowDefaultIncentiveField] = useState(false);

  const [staffs, setStaffs] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "123-456-7890",
      incentive: 0,
      users: [
        { id: 101, name: "User  A", email: "usera@example.com" },
        { id: 102, name: "User  B", email: "userb@example.com" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "987-654-3210",
      incentive: 0,
      users: [
        { id: 103, name: "User  C", email: "userc@example.com" },
        { id: 104, name: "User  D", email: "userd@example.com" },
      ],
    },
  ]);

  // Filter staffs based on search term
  const filteredStaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle setting a default incentive for all staffs
  const handleSetDefaultIncentive = () => {
    if (!defaultIncentive) {
      alert("Please enter an incentive rate.");
      return;
    }

    const updatedStaffs = staffs.map((staff) => ({
      ...staff,
      incentive: parseFloat(defaultIncentive),
    }));

    setStaffs(updatedStaffs);
    setShowDefaultIncentiveField(false);
    alert(`All staffs' incentives updated to ${defaultIncentive}.`);
  };

  // Handle updating individual incentive
  const handleUpdateIncentive = () => {
    if (!selectedStaff || !incentiveRate) {
      alert("Please select a staff and set an incentive rate.");
      return;
    }

    const updatedStaffs = staffs.map((s) =>
      s.id === selectedStaff.id ? { ...s, incentive: parseFloat(incentiveRate) } : s
    );

    setStaffs(updatedStaffs);
    setBillGenerated(true);
    alert(`Incentive updated for ${selectedStaff.name} to ${incentiveRate}.`);

    // Close the "Update Incentive" box after updating
    setSelectedStaff(null);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedStaff(null);
    setIncentiveRate("");
    setBillGenerated(false);
    setDefaultIncentive("");
    setShowDefaultIncentiveField(false);

    // Reset all staffs' incentives to their initial state (if needed)
    setStaffs((prevStaffs) =>
      prevStaffs.map((staff) => ({ ...staff }))
    );
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-lg">
      {/* Header with Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#640D5F]">Payout Settings</h2>
        <div className="flex space-x-4">
          {/* Set Default Incentive Button */}
          <button
            className="p-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
            onClick={() => setShowDefaultIncentiveField(!showDefaultIncentiveField)}
          >
            Set Default Incentive
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
          placeholder="Search Staff..."
          className="w-100 p-3 border border-gray-600 rounded-lg "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Default Incentive Input Field */}
      {showDefaultIncentiveField && (
        <div className="flex justify-center">
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-100 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">Set Incentive for All</label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Enter default incentive"
                className="w-100 p-2 border border-gray-300 rounded-lg"
                value={defaultIncentive}
                onChange={(e) => setDefaultIncentive(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
                onClick={handleSetDefaultIncentive}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Individual Incentive Update Form (Now Above Table) */}
      {selectedStaff && (
        <div className="flex justify-center">
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-100">
            <h3 className="text-lg font-semibold mb-2 text-[#640D5F]">Update Incentive</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff Name</label>
                <input type="text" value={selectedStaff.name} className="w-full p-2 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Previous Incentive</label>
                <input type="text" value={selectedStaff.incentive} className="w-full p-2 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Incentive Rate</label>
                <input
                  type="number"
                  placeholder="Enter incentive rate"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={incentiveRate}
                  onChange={(e) => setIncentiveRate(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all"
                onClick={handleUpdateIncentive}
              >
                Update Incentive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staffs Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Staffs</h3>
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className="bg-[#d64fcf] text-white">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Mobile Number</th>
              <th className="p-3 text-center">Incentive</th>
              <th className="p-3 text-center">Member Count</th>
              <th className="p-3 text-center">Update Incentive</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="p-3 text-center border-b border-gray-200">{staff.name}</td>
                  <td className="p-3 text-center border-b border-gray-200">{staff.mobile}</td>
                  <td className="p-3 text-center border-b border-gray-200">{staff.incentive}</td>
                  <td className="p-3 text-center border-b border-gray-200">{staff.users.length}</td>
                  <td className="p-3 text-center border-b border-gray-200">
                    <button
                      className="text-[#8A1C7C] mx-auto rounded-lg transition-all flex items-center"
                      onClick={() => setSelectedStaff(staff)}
                    >
                      <FaEdit className="ms-10" size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No staffs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPayoutSetting;