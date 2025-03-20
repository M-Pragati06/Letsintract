import React, { useState, useEffect } from "react";

const StaffUpdation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [editStaffId, setEditStaffId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    permissions: [],
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStaffId, setDeleteStaffId] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");

  const dummyData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", password: "pass123", permissions: ["Home", "Business"] },
    { id: 2, name: "Bob Williams", email: "bob@example.com", password: "pass456", permissions: ["Staff Management"] },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", password: "pass789", permissions: ["Account", "Configuration"] }
  ];

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    if (!storedStaff || storedStaff.length === 0) {
      localStorage.setItem("staff", JSON.stringify(dummyData));
      setStaff(dummyData);
      setFilteredStaff(dummyData);
    } else {
      setStaff(storedStaff);
      setFilteredStaff(storedStaff);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
    setFilteredStaff(staff);
  }, [staff]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredStaff(staff.filter((s) => s.name.toLowerCase().includes(term)));
  };

  const handleEdit = (staffMember) => {
    setEditStaffId(staffMember.id);
    setEditForm({ ...staffMember });
  };

  const handleEditChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const togglePermission = (permission) => {
    setEditForm((prevData) => {
      const newPermissions = prevData.permissions.includes(permission)
        ? prevData.permissions.filter((perm) => perm !== permission)
        : [...prevData.permissions, permission];
      return { ...prevData, permissions: newPermissions };
    });
  };

  const handleUpdate = () => {
    const updatedStaff = staff.map((s) =>
      s.id === editStaffId ? { ...s, ...editForm } : s
    );
    setStaff(updatedStaff);
    setEditStaffId(null);
  };

  const confirmDelete = (id) => {
    setDeleteStaffId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (confirmationInput.toLowerCase() !== "confirm") {
      alert("Please enter 'confirm' to delete the record.");
      return;
    }

    const updatedStaff = staff.filter((s) => s.id !== deleteStaffId);
    setStaff(updatedStaff);
    localStorage.setItem("staff", JSON.stringify(updatedStaff));

    setShowDeleteConfirm(false);
    setDeleteStaffId(null);
    setConfirmationInput(""); // Reset confirmation input
  };

  return (
    <div className="Form p-6 mt-10 mx-auto rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#640D5F] mb-6">Staff Management</h1>

      <input type="search" placeholder="Search by Name" value={searchTerm} onChange={handleSearch} className="w-full p-3 border rounded-lg mb-4" />

      {editStaffId && (
        <div className="mb-6 p-4 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#640D5F] mb-4 text-center">Edit Staff</h2>
          <input type="text" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="email" name="email" placeholder="Email" value={editForm.email} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <div>
            <h3 className="text-lg font-semibold">Permissions:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Home", "Business", "Politician",
                "Associate Management", "Account", "Notifications", "Configuration",
                "Report"].map((type) => (
                <button key={type} type="button" className={`px-4 py-2 rounded-full border ${editForm.permissions.includes(type) ? "bg-pink-500 text-white" : "border-gray-400 text-gray-100 bg-purple-400"}`} onClick={() => togglePermission(type)}>
                  {type} {editForm.permissions.includes(type) ? "✓" : "+"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex mt-3 justify-center w-full">
            <button onClick={handleUpdate} className="w-60 bg-[#9b1694] text-white p-3 rounded-lg font-bold hover:bg-[#9b1690]">Update</button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#b017a8] text-white">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Permissions</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staffMember) => (
            <tr key={staffMember.id} className="border bg-white hover:bg-gray-200">
              <td className="p-3 border text-center">{staffMember.name}</td>
              <td className="p-3 border text-center">{staffMember.email}</td>
              <td className="p-3 border text-center">{staffMember.permissions.join(", ")}</td>
              <td className="p-3 border text-center">
                <div className="flex justify-center space-x-2">
                  <button onClick={() => handleEdit(staffMember)} className="bg-blue-600 text-white px-3 py-1 rounded-lg">Edit</button>
                  <button onClick={() => confirmDelete(staffMember.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Enter 'confirm' to delete the record:</p>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-center gap-5">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300 text-black px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffUpdation;