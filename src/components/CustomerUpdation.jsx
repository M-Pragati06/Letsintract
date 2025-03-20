import React, { useState, useEffect } from "react";

const CustomerUpdation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    taluka: "",
    referencedBy: "",
    verified: false
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordCustomerId, setPasswordCustomerId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = "reset@123"; // Default password for reset

  // Dummy data for initial load
  const dummyCustomers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", password: "john@123", state: "Maharashtra", district: "Satara", taluka: "Satara", referencedBy: "associate", verified: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", password: "jane@123", state: "Maharashtra", district: "Pune", taluka: "Haveli", referencedBy: "staff", verified: false },
    { id: 3, name: "Alice Brown", email: "alice@example.com", phone: "555-123-7890", password: "alice@123", state: "Maharashtra", district: "Mumbai", taluka: "Mumbai", referencedBy: "associate", verified: true }
  ];

  // Load data from local storage or use dummy data
  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers"));
    if (!storedCustomers || storedCustomers.length === 0) {
      localStorage.setItem("customers", JSON.stringify(dummyCustomers));
      setCustomers(dummyCustomers);
      setFilteredCustomers(dummyCustomers);
    } else {
      setCustomers(storedCustomers);
      setFilteredCustomers(storedCustomers);
    }
  }, []);

  // Update local storage whenever customers list changes
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    setFilteredCustomers(customers);
  }, [customers]);

  // Search Function
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCustomers(customers.filter((c) => c.name.toLowerCase().includes(term)));
  };

  // Handle Edit
  const handleEdit = (customer) => {
    setEditCustomer(customer.id);
    setEditForm({ ...customer });
  };

  // Handle Input Change in Edit Form
  const handleEditChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // Update Customer Data
  const handleUpdate = () => {
    const updatedCustomers = customers.map((cust) => (cust.id === editCustomer ? { ...cust, ...editForm } : cust));
    setCustomers(updatedCustomers);
    setEditCustomer(null);
  };

  // Confirm Delete Modal
  const confirmDelete = (id) => {
    setDeleteCustomerId(id);
    setShowDeleteConfirm(true);
  };

  // Handle Delete
  const handleDelete = () => {
    if (confirmationInput.toLowerCase() !== "confirm") {
      alert("Please enter 'confirm' to delete the record.");
      return;
    }

    const updatedCustomers = customers.filter((cust) => cust.id !== deleteCustomerId);
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers); // Ensure filtered list is updated
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));

    setShowDeleteConfirm(false);
    setDeleteCustomerId(null);
    setConfirmationInput(""); // Reset confirmation input
  };

  // Handle Reset Key
  const handleResetKey = (id) => {
    const updatedCustomers = customers.map((cust) =>
      cust.id === id ? { ...cust, password: resetPassword } : cust
    );
    setCustomers(updatedCustomers);
    setShowResetSuccess(true); // Show reset success message
    setTimeout(() => setShowResetSuccess(false), 3000); // Hide message after 3 seconds
  };

  // Handle Toggle Verification
  const handleToggleVerification = (id) => {
    const updatedCustomers = customers.map((cust) =>
      cust.id === id ? { ...cust, verified: !cust.verified } : cust
    );
    setCustomers(updatedCustomers);
  };

  // Handle Password Update
  const handleUpdatePassword = () => {
    const updatedCustomers = customers.map((cust) =>
      cust.id === passwordCustomerId ? { ...cust, password: newPassword } : cust
    );
    setCustomers(updatedCustomers);
    setShowPasswordModal(false);
    setNewPassword(""); // Reset new password input
  };

  return (
    <div className="Form p-6 mt-10 mx-auto rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#640D5F] mb-6" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Customer Management</h1>

      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-[#640D5F] text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#640D5F]"
      />

      {/* Edit Form */}
      {editCustomer && (
        <div className="mb-6 p-4 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#640D5F] mb-4 text-center">Edit Customer</h2>
          <input type="text" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="email" name="email" placeholder="Email" value={editForm.email} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="phone" placeholder="Phone" value={editForm.phone} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="state" placeholder="State" value={editForm.state} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="district" placeholder="District" value={editForm.district} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="taluka" placeholder="Taluka" value={editForm.taluka} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="referencedBy" placeholder="Referenced By" value={editForm.referencedBy} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <div className="flex mt-3 justify-center w-full">
            <button onClick={handleUpdate} className="w-60 bg-[#9b1694] text-white p-3 rounded-lg font-bold hover:bg-[#9b1690]">Update</button>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#b017a8] text-white uppercase text-sm leading-normal">
            <th className="p-3 border border-[#640D5F]">Name</th>
            <th className="p-3 border border-[#640D5F]">Phone</th>
            <th className="p-3 border border-[#640D5F]">Actions</th>
            <th className="p-3 border border-[#640D5F]">Verified</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-sm font-light">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`border border-[#640D5F] ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
              >
                <td className="p-3 border border-[#640D5F] text-center">{customer.name}</td>
                <td className="p-3 border border-[#640D5F] text-center">{customer.phone}</td>
                <td className="p-3 border border-[#640D5F] text-center">
                  <button onClick={() => handleEdit(customer)} className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition mr-2">
                    Edit
                  </button>
                  <button onClick={() => confirmDelete(customer.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition mr-2">
                    Delete
                  </button>
                  <button onClick={() => { setPasswordCustomerId(customer.id); setShowPasswordModal(true); }} className="bg-[#A0C878] text-white px-3 py-1 rounded-lg hover:bg-[#8eb16ae5] transition mr-2">
                    Update Password
                  </button>
                  <button onClick={() => handleResetKey(customer.id)} className="bg-[#54B4D3] text-white px-3 py-1 rounded-lg hover:bg-[#5a8fa1] transition">
                    Reset Key
                  </button>
                </td>
                <td className="p-3 border border-[#640D5F] text-center">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={customer.verified}
                      onChange={() => handleToggleVerification(customer.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-2">Enter 'confirm' to delete this customer:</p>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Confirm
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(false)} 
              className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-400 transition ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reset Success Message */}
      {showResetSuccess && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Reset Successful</h2>
            <p className="mb-4">The password has been reset to <strong>reset@123</strong>.</p>
            <button 
              onClick={() => setShowResetSuccess(false)} 
              className="bg-[#54B4D3] text-white px-4 py-2 rounded hover:bg-[#5c91a3] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Password Modal */}
      {showPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Update Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button 
              onClick={handleUpdatePassword} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Password
            </button>
            <button 
              onClick={() => setShowPasswordModal(false)} 
              className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-400 transition ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerUpdation;