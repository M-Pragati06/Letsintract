import React, { useState } from "react";

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [members, setMembers] = useState([
    { name: "Member A", tel: "123-456-7890", password: "pass123", businessPerson: "John Doe", verified: false },
    { name: "Member B", tel: "987-654-3210", password: "pass456", businessPerson: "Jane Smith", verified: true },
  ]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", tel: "", verified: false });
  const [editIndex, setEditIndex] = useState(null);
  const [editMember, setEditMember] = useState({ name: "", tel: "", defaultPassword: "" });
  const [viewedBusinessPerson, setViewedBusinessPerson] = useState(null);
  const [showMemberTable, setShowMemberTable] = useState(false);
  const [businessPersonSearchTerm, setBusinessPersonSearchTerm] = useState("");
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [otp, setOtp] = useState(Array(6).fill('')); // Assuming a 6-digit OTP
  const [defaultPassword, setDefaultPassword] = useState('');
  const [confirmationInput, setConfirmationInput] = useState('');

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [actionMemberIndex, setActionMemberIndex] = useState(null);

  const businessPersons = [
    { name: "John Doe", plan: "Premium Plan", password: "john123" },
    { name: "Jane Smith", plan: "Basic Plan", password: "jane456" },
    { name: "Michael Brown", plan: "Gold Plan", password: "michael789" },
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const setEditMembers = (index) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], ...editMember };
    setMembers(updatedMembers);
    setEditIndex(null);
    setEditMember({ name: "", tel: "", defaultPassword: "" });
  };

  const selectMember = (member) => {
    setSelectedMember(member.name);
    setSelectedPlan(member.plan);
    setSearchTerm("");
    setShowAddMember(false);
  };

  const clearSelectedMember = () => {
    setSelectedMember(null);
    setSelectedPlan("");
    setShowMemberTable(false);
  };

  const toggleAddMemberForm = () => {
    setShowAddMember(!showAddMember);
    if (!showAddMember) {
      setDefaultPassword('Pass@123'); // Set default password when opening the form
    }
  };

  const handleNewMemberChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const isValidPhoneNumber = (tel) => {
    const phoneRegex = /^[0-9]{3}[0-9]{3}[0-9]{4}$/; // Example format: 123-456-7890
    return phoneRegex.test(tel);
  };

  const handleSubmitNewMember = () => {
    if (!newMember.name || !newMember.tel || !defaultPassword || !isValidPhoneNumber(newMember.tel) || otp.join('').length !== 6) {
      alert("Please fill all fields correctly. Ensure the mobile number is in the format XXXXXXXXXX and OTP is 6 digits.");
      return;
    }

    const newMemberData = {
      ...newMember,
      password: defaultPassword,
      businessPerson: selectedMember || "Unassigned",
      verified: false,
    };

    setMembers([...members, newMemberData]);
    setNewMember({ name: "", tel: "" });
    setDefaultPassword(''); // Reset default password after submission
    setShowAddMember(false);
  };

  const handleEditChange = (e) => {
    setEditMember({ ...editMember, [e.target.name]: e.target.value });
  };

  const handleAction = (action, index) => {
    switch (action) {
      case "edit":
        setEditIndex(index);
        setEditMember(members[index]);
        break;
      case "delete":
        setActionMemberIndex(index);
        setShowDeleteConfirm(true);
        break;
      case "reset":
        setActionMemberIndex(index);
        setShowResetConfirm(true);
        break;
      case "verify":
        setMembers(members.map((member, i) =>
          i === index ? { ...member, verified: !member.verified } : member
        ));
        break;
      default:
        break;
    }
  };

  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.businessPerson]) {
      acc[member.businessPerson] = [];
    }
    acc[member.businessPerson].push(member);
    return acc;
  }, {});

  const filteredBusinessPersons = Object.entries(groupedMembers).filter(([businessPerson]) =>
    businessPerson.toLowerCase().includes(businessPersonSearchTerm.toLowerCase())
  );

  const filteredMembers = groupedMembers[viewedBusinessPerson]?.filter((member) =>
    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
    member.tel.toLowerCase().includes(memberSearchTerm.toLowerCase())
  );

  const handleGetOtp = () => {
    alert("OTP has been sent to the provided number.");
    // Logic to send OTP can be added here
  };

  const handleDelete = () => {
    setMembers(members.filter((_, i) => i !== actionMemberIndex));
    setShowDeleteConfirm(false);
    setActionMemberIndex(null);
  };

  const handleResetKey = () => {
    const updatedMembers = [...members];
    updatedMembers[actionMemberIndex].password = "newPassword123";
    setMembers(updatedMembers);
    setShowResetConfirm(false);
    setActionMemberIndex(null);
  };

  return (
    <div className="Form mt-10 flex flex-col items-center">
      <div className="flex gap-6 w-full">
        <div className={`p-6 py-10 flex flex-col justify-center items-center rounded-lg ${selectedMember ? "w-2/3" : "w-full"}`}>
          <h1 className="text-3xl font-bold text-[#640D5F] mb-6">Member Management</h1>

          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search politician..."
              className="p-2 border rounded-lg w-150 mb-6"
            />
            {searchTerm && (
              <div className="absolute bg-white border mt-1 w-80 shadow-lg rounded-lg">
                {businessPersons
                  .filter((person) =>
                    person.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((person, index) => (
                    <div
                      key={index}
                      onClick={() => selectMember(person)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {person.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {selectedMember && (
            <div className="flex items-center gap-2 mb-4">
              <p className="text-green-600 font-semibold">Selected Politician: {selectedMember}</p>
              <button onClick={clearSelectedMember} className="text-red-500 hover:text-red-700" style={{boxShadow:"none"}}>Clear</button>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
              className={`bg-[#aa1ba3] text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#640D5F] transition duration-200 ${!selectedMember ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={toggleAddMemberForm}
              disabled={!selectedMember}
            >
              ➕ Add Member
            </button>
          </div>
          
          {showAddMember && (
            <div className="mt-4 p-4 rounded-lg bg-[#faf1f9] w-100" style={{boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}>
              <h3 className="text-lg font-bold mb-2">Add New Member</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleNewMemberChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="tel"
                name="tel"
                placeholder="Mobile No."
                value={newMember.tel}
                onChange={handleNewMemberChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex items-center space-x-2 my-2 mt-2">
                <button
                  className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
                  onClick={handleGetOtp}
                >
                  Get OTP
                </button>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp.join('')}
                  onChange={(e) => setOtp(e.target.value.split('').slice(0, 6))}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <label htmlFor="password">Default Password</label>
              <input
                type="text"
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />

              <div className="flex justify-center mt-4">
                <button
                  className="bg-[#aa1ba3] text-white px-4 py-2 rounded hover:bg-green-600 shadow-md transition-transform transform hover:scale-105"
                  onClick={handleSubmitNewMember}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {selectedMember && (
          <div className="bg-[#bd4fb7] p-6 rounded-lg shadow-md w-1/3 h-64 text-white flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold mb-2">Plan Information</h2>
            <p className="text-xl">{selectedPlan}</p>
          </div>
        )}
      </div>

      <div className="mt-6 w-full p-4 rounded-lg overflow-x-auto">
        {showMemberTable && viewedBusinessPerson && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Members under {viewedBusinessPerson}</h3>
              <button
                onClick={() => {
                  setShowMemberTable(false);
                  setViewedBusinessPerson(null);
                }}
                className="text-red-500 hover:text-red-700 p-2 rounded-xl"
                style={{boxShadow:"none",border:"2px solid red"}}
              >
                ✖ Close
              </button>
            </div>
            <input
              type="text"
              value={memberSearchTerm}
              onChange={(e) => setMemberSearchTerm(e.target.value)}
              placeholder="Search member..."
              className="p-1 border rounded-lg w-70 mb-4 center mt-2"
            />
            {filteredMembers && filteredMembers.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-[#ebace8]">
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Mobile Number</th>
                    <th className="border px-4 py-2">Default Password</th>
                    <th className="border px-4 py-2">Verified</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, memberIndex) => {
                    const actualIndex = members.findIndex((m) => m === member);

                    return (
                      <tr key={memberIndex} className="text-center hover:bg-gray-100 h-16">
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="text"
                              name="name"
                              value={editMember.name}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            member.name
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="tel"
                              name="tel"
                              value={editMember.tel}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            member.tel
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="text"
                              name="defaultPassword"
                              value={editMember.defaultPassword}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            member.password
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={member.verified}
                              onChange={() => handleAction("verify", actualIndex)}
                              className="sr-only"
                            />
                            <div className={`w-9 h-4 rounded-full ${member.verified ? "bg-green-500" : "bg-gray-500"} shadow-inner transition-colors duration-200`}>
                              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${member.verified ? "translate-x-5" : "translate-x-0"}`} />
                            </div>
                          </label>
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 shadow-md transition-transform transform hover:scale-105"
                              onClick={() => setEditMembers(actualIndex)}
                            >
                              Save
                            </button>
                          ) : (
                            <>
                              <button
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
                                onClick={() => handleAction("edit", actualIndex)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 shadow-md transition-transform transform hover:scale-105 ml-2"
                                onClick={() => handleAction("delete", actualIndex)}
                              >
                                Delete
                              </button>
                              <button
                                className="bg-[#0dcaf0] text-white px-2 py-1 rounded hover:bg-[#0dcaf0d4] shadow-md transition-transform transform hover:scale-105 ml-2"
                                onClick={() => handleAction("reset", actualIndex)}
                              >
                                Reset Key
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No members found for {viewedBusinessPerson}.</p>
            )}
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Politicians</h2>
          </div>

          <input
            type="text"
            value={businessPersonSearchTerm}
            onChange={(e) => setBusinessPersonSearchTerm(e.target.value)}
            placeholder="Search politician..."
            className="p-1 border rounded-lg w-70 mb-4"
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#ebace8]">
                <th className="border px-4 py-2">Politicians</th>
                <th className="border px-4 py-2">Member Count</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinessPersons.map(([businessPerson, businessMembers]) => (
                <tr key={businessPerson} className="text-center hover:bg-gray-100 h-16">
                  <td className="border px-4 py-2">{businessPerson}</td>
                  <td className="border px-4 py-2">{businessMembers.length}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
                      onClick={() => {
                        setViewedBusinessPerson(businessPerson);
                        setShowMemberTable(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-2">Enter 'confirm' to delete this member:</p>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              className="border rounded p-2 mb-4"
            />
            <div className="flex justify-center mt-4">
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
        </div>
      )}

      {/* Reset Key Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Confirm Reset Key</h2>
            <p className="mb-2">Are you sure you want to reset the password for this member?</p>
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleResetKey} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Confirm
              </button>
              <button 
                onClick={() => setShowResetConfirm(false)} 
                className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-400 transition ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;