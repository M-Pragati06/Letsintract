import React, { useState } from "react";

const AddPolitician = () => {
  const [politicianData, setPoliticianData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    district: "",
    taluka: "",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [politicians, setPoliticians] = useState([]);
  const [referencedBy, setReferencedBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [otp, setOtp] = useState("");

  const states = ["State1", "State2", "State3"];
  const districts = {
    State1: ["District1", "District2"],
    State2: ["District3"],
    State3: ["District4", "District5"],
  };
  const talukas = {
    District1: ["Taluka1", "Taluka2"],
    District2: ["Taluka3"],
    District3: ["Taluka4"],
    District4: ["Taluka5"],
  };

  // Sample associates data
  const associates = [
    { id: 1, name: "John Doe", mobile: "1234567890" },
    { id: 2, name: "Jane Smith", mobile: "0987654321" },
    { id: 3, name: "Alice Johnson", mobile: "1122334455" },
  ];

  // Sample staff data
  const staff = [
    { id: 1, name: "Michael Brown", mobile: "2233445566" },
    { id: 2, name: "Emily Davis", mobile: "3344556677" },
    { id: 3, name: "David Wilson", mobile: "4455667788" },
  ];

  const validate = () => {
    let tempErrors = {};
    
    // Name validation
    if (!politicianData.name.trim()) {
      tempErrors.name = "Name is required";
    }

    // Email validation
    if (!politicianData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(politicianData.email)) {
      tempErrors.email = "Email is not valid";
    }

    // Phone validation
    if (!politicianData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(politicianData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
    }

    // OTP validation
    if (!otp) {
      tempErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otp)) {
      tempErrors.otp = "OTP must be exactly 6 digits";
    }

    // Password validation
    if (!politicianData.password) {
      tempErrors.password = "Password is required";
    } else if (politicianData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    // State validation
    if (!politicianData.state) {
      tempErrors.state = "State is required";
    }

    // District validation
    if (!politicianData.district) {
      tempErrors.district = "District is required";
    }

    // Taluka validation
    if (!politicianData.taluka) {
      tempErrors.taluka = "Taluka is required";
    }


    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setPoliticianData({ ...politicianData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setPoliticians([...politicians, { name: politicianData.name, email: politicianData.email, phone: politicianData.phone }]);
      setPoliticianData({ name: "", email: "", phone: "", password: "", district: "", taluka: "", state: "" });
      setErrors({});
      setReferencedBy("");
      setSearchInput("");
      setSelectedAssociate(null);
      setSelectedStaff(null);
      setOtp(""); // Clear OTP after successful submission
    }
  };

  const handleReferencedByChange = (e) => {
    setReferencedBy(e.target.value);
    if (e.target.value === "") {
      setSearchInput("");
      setSelectedAssociate(null);
      setSelectedStaff(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredAssociates = associates.filter(associate => 
    associate.name.toLowerCase().includes(searchInput.toLowerCase()) || 
    associate.mobile.includes(searchInput)
  );

  const filteredStaff = staff.filter(staffMember => 
    staffMember.name.toLowerCase().includes(searchInput.toLowerCase()) || 
    staffMember.mobile.includes(searchInput)
  );

  const handleSelectAssociate = (associate) => {
    setSelectedAssociate(associate);
    setSearchInput(""); // Clear search input after selection
  };

  const handleSelectStaff = (staffMember) => {
    setSelectedStaff(staffMember);
    setSearchInput(""); // Clear search input after selection
  };

  const handleGetOtp = () => {
    // Logic to send OTP to the phone number
    alert(`OTP sent to ${politicianData.phone}`);
  };

  return (
    <>
      <div className="Form max-w-xl mx-auto mt-10 p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#640D5F]" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Add Politician</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Politician Name" value={politicianData.name} onChange={handleChange} className="w-full rounded p-2 border border-[#640D5F]" />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" value={politicianData.email} onChange={handleChange} className="w-full rounded p-2 border border-[#640D5F]" />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          <div className="flex items-center space-x-2">
            <input type="tel" name="phone" placeholder="Phone Number" value={politicianData.phone} onChange={handleChange} className="flex-1/2 rounded p-2 border border-[#640D5F]" />
            <button type="button" onClick={handleGetOtp} className="w-1/3 bg-[#e762e1] text-white cursor-pointer p-2 rounded-md">Get OTP</button>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-1/3 rounded p-2 border border-[#640D5F]" />
          </div>
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          {errors.otp && <p className="text-red-400 text-sm">{errors.otp}</p>} {/* OTP error message */}

          <input type="password" name="password" placeholder="Password" value={politicianData.password} onChange={handleChange} className="w-full rounded p-2 border border-[#640D5F]" />
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          
          <div className="flex space-x-2">
            <select name="state" value={politicianData.state} onChange={handleChange} className="w-1/3 rounded p-2 border border-[#640D5F]">
              <option value="">State</option>
              {states.map((state) => (<option key={state} value={state}>{state}</option>))}
            </select>
            {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
            <select name="district" value={politicianData.district} onChange={handleChange} className="w-1/3 rounded p-2 border border-[#640D5F]" disabled={!politicianData.state}>
              <option value="">District</option>
              {politicianData.state && districts[politicianData.state]?.map((district) => (<option key={district} value={district}>{district}</option>))}
            </select>
            {errors.district && <p className="text-red-400 text-sm">{errors.district}</p>}
            <select name="taluka" value={politicianData.taluka} onChange={handleChange} className="w-1/3 p-2 rounded border border-[#640D5F]" disabled={!politicianData.district}>
              <option value="">Taluka</option>
              {politicianData.district && talukas[politicianData.district]?.map((taluka) => (<option key={taluka} value={taluka}>{taluka}</option>))}
            </select>
            {errors.taluka && <p className="text-red-400 text-sm">{errors.taluka}</p>}
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Referenced By</h3>
            <div className="flex space-x-4">
              <label>
                <input type="radio" value="associates" checked={referencedBy === "associates"} onChange={handleReferencedByChange} />
                Associates
              </label>
              <label>
                <input type="radio" value="staff" checked={referencedBy === "staff"} onChange={handleReferencedByChange} />
                Staff
              </label>
            </div>

            <div className="flex mt-2">
              <div className="w-1/2 pr-2">
                {referencedBy === "associates" && (
                  <div>
                    <input 
                      type="text" 
                      placeholder="Search by Name or Mobile No." 
                      value={searchInput} 
                      onChange={handleSearchChange} 
                      className="w-full rounded p-2 border border-[#640D5F]" 
                    />
                    {searchInput && filteredAssociates.length > 0 && (
                      <ul className="mt-2 border border-[#640D5F] rounded">
                        {filteredAssociates.map(associate => (
                          <li 
                            key={associate.id} 
                            onClick={() => handleSelectAssociate(associate)} 
                            className="p-2 cursor-pointer hover:bg-[#ebace8]"
                          >
                            {associate.name} (ID: {associate.id}, Mobile: {associate.mobile})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {referencedBy === "staff" && (
                  <div>
                    <input 
                      type="text" 
                      placeholder="Search by Name or Mobile No." 
                      value={searchInput} 
                      onChange={handleSearchChange} 
                      className="w-full rounded p-2 border border-[#640D5F]" 
                    />
                    {searchInput && filteredStaff.length > 0 && (
                      <ul className="mt-2 border border-[#640D5F] rounded">
                        {filteredStaff.map(staffMember => (
                          <li 
                            key={staffMember.id} 
                            onClick={() => handleSelectStaff(staffMember)} 
                            className="p-2 cursor-pointer hover:bg-[#ebace8]"
                          >
                            {staffMember.name} (ID: {staffMember.id}, Mobile: {staffMember.mobile})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="w-1/2 pl-2">
                {selectedAssociate && (
                  <p className="mt-2">{selectedAssociate.name} (ID: {selectedAssociate.id})</p>
                )}
                {selectedStaff && (
                  <p className="mt-2">{selectedStaff.name} (ID: {selectedStaff.id})</p>
                )}
                {errors.referencedBy && <p className="text-red-400 text-sm">{errors.referencedBy}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <button type="submit" className="w-40 bg-[#aa1ba3] hover:bg-[#640D5F] font-bold text-white p-2 mt-5 rounded-md">Add Politician</button>
          </div>
        </form>
      </div>

      <div>
        {politicians.length > 0 && (
          <table className="mt-6 w-full border-collapse border border-[#aa1ba3] rounded">
            <thead>
              <tr className="bg-[#ebace8]">
                <th className="border border-[#aa1ba3] p-2">Sr. No.</th>
                <th className="border border-[#aa1ba3] p-2">Name</th>
                <th className="border border-[#aa1ba3] p-2">Email</th>
                <th className="border border-[#aa1ba3] p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {politicians.map((politician, index) => (
                <tr key={index}>
                  <td className="border border-[#aa1ba3] p-2">{index + 1}</td>
                  <td className="border border-[#aa1ba3] p-2">{politician.name}</td>
                  <td className="border border-[#aa1ba3] p-2">{politician.email}</td>
                  <td className="border border-[#aa1ba3] p-2">{politician.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AddPolitician;