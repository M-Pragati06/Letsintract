import React, { useState } from "react";
import "./application.css";

const AddAssociate = () => {
  const [associateData, setAssociateData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    taluka: "",
    referencedBy: "",
  });

  const [errors, setErrors] = useState({});
  const [associateList, setAssociateList] = useState([]);
  const [otp, setOtp] = useState("");

  const [confirmationInput, setConfirmationInput] = useState("");

  const states = ["State1", "State2", "State3"];
  const districts = { State1: ["District1", "District2"], State2: ["District3"], State3: ["District4", "District5"] };
  const talukas = { District1: ["Taluka1", "Taluka2"], District2: ["Taluka3"], District3: ["Taluka4"], District4: ["Taluka5"] };

  const validate = () => {
    let tempErrors = {};
    
    if (!associateData.name.trim()) {
      tempErrors.name = "Name is required";
    }

    if (!associateData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(associateData.email)) {
      tempErrors.email = "Email is not valid";
    }

    if (!associateData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(associateData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!associateData.state) {
      tempErrors.state = "State is required";
    }

    if (!associateData.district) {
      tempErrors.district = "District is required";
    }

    if (!associateData.taluka) {
      tempErrors.taluka = "Taluka is required";
    }

    if (!otp) {
      tempErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otp)) {
      tempErrors.otp = "OTP must be exactly 6 digits";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setAssociateData({ ...associateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setAssociateList([...associateList, { 
        name: associateData.name, 
        email: associateData.email, 
        phone: associateData.phone 
      }]);
      setAssociateData({ name: "", email: "", phone: "", state: "", district: "", taluka: "", referencedBy: "" });
      setErrors({});
      setOtp("");
    }
  };

  const handleGetOtp = () => {
    alert(`OTP sent to ${associateData.phone}`);
  };

  return (
    <>
      <div className="Form max-w-xl mx-auto mt-10 p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#640D5F]" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Add Associate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Associate Name" value={associateData.name} onChange={handleChange} className="w-full rounded p-2 border border-[#640D5F]" />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" value={associateData.email} onChange={handleChange} className="w-full rounded p-2 border border-[#640D5F]" />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          <div className="flex space-x-2">
            <input type="text" name="phone" placeholder="Phone Number" value={associateData.phone} onChange={handleChange} className="w-1/2 rounded p-2 border border-[#640D5F]" />
            <button type="button" onClick={handleGetOtp} className="w-1/3 bg-[#e762e1] hover:bg-[#d179cc] font-bold text-white p-2 rounded-md">Get OTP</button>
            <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-1/3 rounded p-2 border border-[#640D5F]" />
          </div>
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          {errors.otp && <p className="text-red-400 text-sm">{errors.otp}</p>}

          <div className="flex space-x-2">
            <select name="state" value={associateData.state} onChange={handleChange} className="w-1/3 rounded p-2 border border-[#640D5F]">
              <option value="">Select State</option>
              {states.map((state) => (<option key={state} value={state}>{state}</option>))}
            </select>
            {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
            
            <select name="district" value={associateData.district} onChange={handleChange} className="w-1/3 rounded p-2 border border-[#640D5F]" disabled={!associateData.state}>
              <option value="">Select District</option>
              {districts[associateData.state]?.map((district) => (<option key={district} value={district}>{district}</option>))}
            </select>
            {errors.district && <p className="text-red-400 text-sm">{errors.district}</p>}
            
            <select name="taluka" value={associateData.taluka} onChange={handleChange} className="w-1/3 rounded p-2 border border-[#640D5F]" disabled={!associateData.district}>
              <option value="">Select Taluka</option>
              {talukas[associateData.district]?.map((taluka) => (<option key={taluka} value={taluka}>{taluka}</option>))}
            </select>
            {errors.taluka && <p className="text-red-400 text-sm">{errors.taluka}</p>}
          </div>

          <div className="flex justify-center w-full">
            <button type="submit" className="w-40 bg-[#aa1ba3] hover:bg-[#640D5F] font-bold text-white p-2 mt-5 rounded-md">Add Associate</button>
          </div>
        </form>
      </div>
      <div>
        {/* Associate List Below the Form */}
        {associateList.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-center">Associate List</h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-[#640D5F] text-white">
                  <th className="border border-gray-300 p-2">Sr. No.</th>
                  <th className="border border-gray-300 p-2">Associate Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Mobile No.</th>
                </tr>
              </thead>
              <tbody>
                {associateList.map((associate, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{associate.name}</td>
                    <td className="border border-gray-300 p-2">{associate.email}</td>
                    <td className="border border-gray-300 p-2">{associate.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AddAssociate;