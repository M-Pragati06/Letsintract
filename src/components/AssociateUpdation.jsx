import React, { useState, useEffect } from "react";

const AssociateUpdation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [associates, setAssociates] = useState([]);
  const [filteredAssociates, setFilteredAssociates] = useState([]);
  const [editAssociateId, setEditAssociateId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    taluka: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteAssociateId, setDeleteAssociateId] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");

  const dummyData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "111-222-3333", state: "California", district: "Los Angeles", taluka: "Downtown" },
    { id: 2, name: "Bob Williams", email: "bob@example.com", phone: "444-555-6666", state: "Texas", district: "Houston", taluka: "West End" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "777-888-9999", state: "Florida", district: "Miami", taluka: "South Beach" }
  ];

  useEffect(() => {
    const storedAssociates = JSON.parse(localStorage.getItem("associates"));
    if (!storedAssociates || storedAssociates.length === 0) {
      localStorage.setItem("associates", JSON.stringify(dummyData));
      setAssociates(dummyData);
      setFilteredAssociates(dummyData);
    } else {
      setAssociates(storedAssociates);
      setFilteredAssociates(storedAssociates);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("associates", JSON.stringify(associates));
    setFilteredAssociates(associates);
  }, [associates]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredAssociates(associates.filter((a) => a.name.toLowerCase().includes(term)));
  };

  const handleEdit = (associate) => {
    setEditAssociateId(associate.id);
    setEditForm({ ...associate });
  };

  const handleEditChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    const updatedAssociates = associates.map((a) =>
      a.id === editAssociateId ? { ...a, ...editForm } : a
    );
    setAssociates(updatedAssociates);
    setEditAssociateId(null);
  };

  const confirmDelete = (id) => {
    setDeleteAssociateId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (confirmationInput.toLowerCase() !== "confirm") {
      alert("Please enter 'confirm' to delete the record.");
      return;
    }

    const updatedAssociates = associates.filter((a) => a.id !== deleteAssociateId);
    setAssociates(updatedAssociates);
    localStorage.setItem("associates", JSON.stringify(updatedAssociates));

    setShowDeleteConfirm(false);
    setDeleteAssociateId(null);
    setConfirmationInput(""); // Reset confirmation input
  };

  return (
    <div className="Form p-6 mt-10 mx-auto rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#640D5F] mb-6" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Associate Management</h1>

      <input
        type="search"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-[#640D5F] text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#640D5F]"
      />

      {editAssociateId && (
        <div className="mb-6 p-4 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#640D5F] mb-4 text-center">Edit Associate</h2>
          <input type="text" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="email" name="email" placeholder="Email" value={editForm.email} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="phone" placeholder="Phone Number" value={editForm.phone} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="state" placeholder="State" value={editForm.state} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="district" placeholder="District" value={editForm.district} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <input type="text" name="taluka" placeholder="Taluka" value={editForm.taluka} onChange={handleEditChange} className="w-full p-3 border rounded-lg mb-2" />
          <div className="flex mt-3 justify-center w-full">
            <button onClick={handleUpdate} className="w-60 bg-[#9b1694] text-white p-3 rounded-lg font-bold hover:bg-[#9b1690]">Update</button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#b017a8] text-white uppercase text-sm leading-normal">
            <th className="p-3 border border-[#640D5F]">Name</th>
            <th className="p-3 border border-[#640D5F]">Email</th>
            <th className="p-3 border border-[#640D5F]">Phone</th>
            <th className="p-3 border border-[#640D5F]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssociates.map((associate) => (
            <tr key={associate.id} className="border border-[#640D5F] bg-white hover:bg-gray-200 transition">
              <td className="p-3 border border-[#640D5F] text-center">{associate.name}</td>
              <td className="p-3 border border-[#640D5F] text-center">{associate.email}</td>
              <td className="p-3 border border-[#640D5F] text-center">{associate.phone}</td>
              <td className="p-3 border border-[#640D5F] text-center">
                <button onClick={() => handleEdit(associate)} className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition mr-2">Edit</button>
                <button onClick={() => confirmDelete(associate.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-2">Enter 'confirm' to delete this associate:</p>
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
    </div>
  );
};

export default AssociateUpdation;