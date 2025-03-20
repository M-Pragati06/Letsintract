import React, { useState } from "react";
import * as XLSX from "xlsx";

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [employees, setEmployees] = useState([
    { name: "Employee A", tel: "123-456-7890", password: "pass123", businessPerson: "John Doe", verified: false },
    { name: "Employee B", tel: "987-654-3210", password: "pass456", businessPerson: "Jane Smith", verified: true },
  ]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", tel: "", verified: false });
  const [showTable, setShowTable] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editEmployee, setEditEmployee] = useState({ name: "", tel: "", defaultPassword: "" });
  const [viewedBusinessPerson, setViewedBusinessPerson] = useState(null);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [businessPersonSearchTerm, setBusinessPersonSearchTerm] = useState("");
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [otp, setOtp] = useState(Array(6).fill('')); // Assuming a 6-digit OTP
  const [defaultPassword, setDefaultPassword] = useState('');
  const [confirmationInput, setConfirmationInput] = useState(''); // Added state for confirmation input

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [actionEmployeeIndex, setActionEmployeeIndex] = useState(null);

  const businessPersons = [
    { name: "John Doe", plan: "Premium Plan", password: "john123" },
    { name: "Jane Smith", plan: "Basic Plan", password: "jane456" },
    { name: "Michael Brown", plan: "Gold Plan", password: "michael789" },
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const setEditEmployees = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = { ...updatedEmployees[index], ...editEmployee };
    setEmployees(updatedEmployees);
    setEditIndex(null);
    setEditEmployee({ name: "", tel: "", defaultPassword: "" });
  };

  const selectPerson = (person) => {
    setSelectedPerson(person.name);
    setSelectedPlan(person.plan);
    setSearchTerm("");
    setShowAddEmployee(false);
  };

  const clearSelectedPerson = () => {
    setSelectedPerson(null);
    setSelectedPlan("");
    setShowEmployeeTable(false);
  };

  const toggleAddEmployeeForm = () => {
    setShowAddEmployee(!showAddEmployee);
    if (!showAddEmployee) {
      setDefaultPassword('Pass@123'); // Set default password when opening the form
    }
  };

  const handleNewEmployeeChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const isValidPhoneNumber = (tel) => {
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // Example format: 123-456-7890
    return phoneRegex.test(tel);
  };

  const handleSubmitNewEmployee = () => {
    if (!newEmployee.name || !newEmployee.tel || !defaultPassword || !isValidPhoneNumber(newEmployee.tel) || otp.join('').length !== 6) {
      alert("Please fill all fields correctly. Ensure the mobile number is in the format XXX-XXX-XXXX and OTP is 6 digits.");
      return;
    }

    const newEmployeeData = {
      ...newEmployee,
      password: defaultPassword,
      businessPerson: selectedPerson || "Unassigned",
      verified: false,
    };

    setEmployees([...employees, newEmployeeData]);
    setNewEmployee({ name: "", tel: "" });
    setDefaultPassword(''); // Reset default password after submission
    setShowAddEmployee(false);
  };

  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  const handleAction = (action, index) => {
    switch (action) {
      case "edit":
        setEditIndex(index);
        setEditEmployee(employees[index]);
        break;
      case "delete":
        setActionEmployeeIndex(index);
        setShowDeleteConfirm(true);
        break;
      case "reset":
        setActionEmployeeIndex(index);
        setShowResetConfirm(true);
        break;
      case "verify":
        setEmployees(employees.map((employee, i) =>
          i === index ? { ...employee, verified: !employee.verified } : employee
        ));
        break;
      default:
        break;
    }
  };

  const groupedEmployees = employees.reduce((acc, employee) => {
    if (!acc[employee.businessPerson]) {
      acc[employee.businessPerson] = [];
    }
    acc[employee.businessPerson].push(employee);
    return acc;
  }, {});

  const filteredBusinessPersons = Object.entries(groupedEmployees).filter(([businessPerson]) =>
    businessPerson.toLowerCase().includes(businessPersonSearchTerm.toLowerCase())
  );

  const filteredEmployees = groupedEmployees[viewedBusinessPerson]?.filter((employee) =>
    employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.tel.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  const handleGetOtp = () => {
    alert("OTP has been sent to the provided number.");
    // Logic to send OTP can be added here
  };

  const handleDelete = () => {
    setEmployees(employees.filter((_, i) => i !== actionEmployeeIndex));
    setShowDeleteConfirm(false);
    setActionEmployeeIndex(null);
  };

  const handleResetKey = () => {
    const updatedEmployees = [...employees];
    updatedEmployees[actionEmployeeIndex].password = "newPassword123";
    setEmployees(updatedEmployees);
    setShowResetConfirm(false);
    setActionEmployeeIndex(null);
  };

  return (
    <div className="Form mt-10 flex flex-col items-center">
      <div className="flex gap-6 w-full">
        <div className={`p-6 py-10 flex flex-col justify-center items-center rounded-lg ${selectedPerson ? "w-2/3" : "w-full"}`}>
          <h1 className="text-3xl font-bold text-[#640D5F] mb-6">Employee Management</h1>

          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search customer..."
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
                      onClick={() => selectPerson(person)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {person.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {selectedPerson && (
            <div className="flex items-center gap-2 mb-4">
              <p className="text-green-600 font-semibold">Selected customer: {selectedPerson}</p>
              <button onClick={clearSelectedPerson} className="text-red-500 hover:text-red-700" style={{boxShadow:"none"}}>Clear</button>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
              className={`bg-[#aa1ba3] text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#640D5F] transition duration-200 ${!selectedPerson ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={toggleAddEmployeeForm}
              disabled={!selectedPerson} // Disable button if no business person is selected
            >
              ➕ Add Employee
            </button>
          </div>
          
          {showAddEmployee && (
            <div className="mt-4 p-4 rounded-lg bg-[#faf1f9] w-100" style={{boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}>
              <h3 className="text-lg font-bold mb-2">Add New Employee</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newEmployee.name}
                onChange={handleNewEmployeeChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="tel"
                name="tel"
                placeholder="Mobile No."
                value={newEmployee.tel}
                onChange={handleNewEmployeeChange}
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
                  onClick={handleSubmitNewEmployee}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {selectedPerson && (
          <div className="bg-[#bd4fb7] p-6 rounded-lg shadow-md w-1/3 h-64 text-white flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold mb-2">Plan Information</h2>
            <p className="text-xl">{selectedPlan}</p>
          </div>
        )}
      </div>

      <div className="mt-6 w-full p-4 rounded-lg overflow-x-auto">
        {showEmployeeTable && viewedBusinessPerson && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Employees under {viewedBusinessPerson}</h3>
              <button
                onClick={() => {
                  setShowEmployeeTable(false);
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
              value={employeeSearchTerm}
              onChange={(e) => setEmployeeSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="p-1 border rounded-lg w-70 mb-4 center mt-2"
            />
            {filteredEmployees && filteredEmployees.length > 0 ? (
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
                  {filteredEmployees.map((employee, employeeIndex) => {
                    const actualIndex = employees.findIndex((e) => e === employee);

                    return (
                      <tr key={employeeIndex} className="text-center hover:bg-gray-100 h-16">
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="text"
                              name="name"
                              value={editEmployee.name}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            employee.name
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="tel"
                              name="tel"
                              value={editEmployee.tel}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            employee.tel
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <input
                              type="text"
                              name="defaultPassword"
                              value={editEmployee.defaultPassword}
                              onChange={handleEditChange}
                              className="p-1 border rounded"
                            />
                          ) : (
                            employee.password
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={employee.verified}
                              onChange={() => handleAction("verify", actualIndex)}
                              className="sr-only"
                            />
                            <div className={`w-9 h-4 rounded-full ${employee.verified ? "bg-green-500" : "bg-gray-500"} shadow-inner transition-colors duration-200`}>
                              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${employee.verified ? "translate-x-5" : "translate-x-0"}`} />
                            </div>
                          </label>
                        </td>
                        <td className="border px-4 py-2">
                          {editIndex === actualIndex ? (
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 shadow-md transition-transform transform hover:scale-105"
                              onClick={() => setEditEmployees(actualIndex)}
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
              <p className="text-center text-gray-500">No employees found for {viewedBusinessPerson}.</p>
            )}
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Customers</h2>
          </div>

          {showTable && (
            <>
              <input
                type="text"
                value={businessPersonSearchTerm}
                onChange={(e) => setBusinessPersonSearchTerm(e.target.value)}
                placeholder="Search customer..."
                className="p-1 border rounded-lg w-70 mb-4"
              />
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#ebace8]">
                    <th className="border px-4 py-2">Customers</th>
                    <th className="border px-4 py-2">Employee Count</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBusinessPersons.map(([businessPerson, businessEmployees]) => (
                    <tr key={businessPerson} className="text-center hover:bg-gray-100 h-16">
                      <td className="border px-4 py-2">{businessPerson}</td>
                      <td className="border px-4 py-2">{businessEmployees.length}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105"
                          onClick={() => {
                            setViewedBusinessPerson(businessPerson);
                            setShowEmployeeTable(true);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-2">Enter 'confirm' to delete this employee:</p>
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
            <p className="mb-2">Are you sure you want to reset the password for this employee?</p>
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

export default EmployeeManagement;