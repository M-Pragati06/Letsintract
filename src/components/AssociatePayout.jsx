import React, { useState } from "react";

const AssociatePayout = ({ history, setHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser , setSelectedUser ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMode, setPaymentMode] = useState(""); // State for payment mode
  const [UTR, setUTR] = useState(""); // State for UTR
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", mobile: "123-456-7890", commission: '300', userCount: "23", email: "john@example.com" },
    { id: 2, name: "Jane Smith", mobile: "987-654-3210", commission: '900', userCount: "56", email: "jane@example.com" },
    { id: 3, name: "David Johnson", mobile: "555-123-4567", commission: '350', userCount: "45", email: "david@example.com" },
    { id: 4, name: "Emily Brown", mobile: "777-888-9999", commission: '200', userCount: "30", email: "emily@example.com" },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePayoutClick = (user) => {
    setSelectedUser (user);
    setIsModalOpen(true);
  };

  const handleConfirmPayout = () => {
    // Validation
    if (!payoutAmount || isNaN(payoutAmount) || payoutAmount <= 0) {
      alert("Please enter a valid payout amount greater than zero.");
      return;
    }

    if (!UTR) {
      alert("Please enter a valid UTR.");
      return;
    }

    if (!paymentMode) {
      alert("Please select a payment mode.");
      return;
    }

    // Add the payout to history
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        user: selectedUser ,
        amount: payoutAmount,
        message,
        paymentMode, // Include payment mode in the payout history
        UTR, // Include UTR in the payout history
        date: new Date().toISOString(), // Add a timestamp for the payout
      },
    ]);

    // Remove the user from the payout list
    setUsers(users.filter((user) => user.id !== selectedUser .id));

    // Close the modal and reset inputs
    setIsModalOpen(false);
    setPayoutAmount("");
    setMessage("");
    setPaymentMode(""); // Reset payment mode
    setUTR(""); // Reset UTR
  };

  return (
    <div className="Form mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl text-center font-bold mb-4 text-[#640D5F]" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Payout Management</h2>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search User..."
        className="w-full p-2 border-2 border-[#640D5F] rounded-md mb-4 focus:ring-2 focus:ring-[#640D5F]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-[#ce31c6] text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 text-center">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.mobile}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    <button
                      className="px-4 py-2 bg-[#cc21c3] text-white rounded-md hover:bg-[#a1199a] transition-all"
                      onClick={() => handlePayoutClick(user)}
                    >
                      Pay Out
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="p-5 mt-10">
            <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] flex flex-col" style={{ fontSize: "16px", boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>
              {/* Modal Header */}
              <div className="flex-shrink-0">
    <h3 className="text-xl font-bold mb-4 text-[#640D5F]">Payout Details</h3>
    <p className="mb-2 flex justify-between mx-1">
        <strong>Associate Name:</strong> {selectedUser ?.name}
    </p>
    <p className="mb-2 flex justify-between mx-1">
        <strong>Mobile No.:</strong> {selectedUser ?.mobile}
    </p>
    <p className="mb-2 flex justify-between mx-1">
        <strong>Member Count:</strong> {selectedUser ?.userCount}
    </p>
    <p className="mb-2 flex justify-between mx-1">
        <strong>Commission Rate:</strong> {selectedUser ?.commission}
    </p>
    <p className="mb-2 flex justify-between mx-1">
        <strong>Total Commission:</strong> {selectedUser ?.userCount * selectedUser ?.commission}
    </p>
</div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2">
                {/* Payment Mode Selection */}
                <div className="mb-4">
                  <strong className="block mt-2">Payment Mode:</strong>
                  <select className="w-full p-2 border" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="">Select Payment Mode</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="Phone Pay">Phone Pay</option>
                  </select>
                </div>

                {/* Payout Amount Input */}
                <div className="mb-4 mx-1">
                  <label className="block font-bold">Payout Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#640D5F]"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                  />
                </div>

                {/* UTR Input */}
                <div className="mb-4 mx-1">
                  <strong className="block font-bold">UTR</strong>
                  <input
                    type="text"
                    placeholder="Enter UTR"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#640D5F]"
                    value={UTR}
                    onChange={(e) => setUTR(e.target.value)}
                  />
                </div>
              </div>

              {/* Modal Footer (Action Buttons) */}
              <div className="flex-shrink-0 flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-gray-100 rounded-md hover:bg-gray-400 transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#d01dc7] text-white rounded-md hover:bg-[#a917a2] transition-all"
                  onClick={handleConfirmPayout}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociatePayout;