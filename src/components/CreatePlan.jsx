import React, { useState } from "react";

const CreatePlan = () => {
  const [planData, setPlanData] = useState({
    planName: "",
    price: "",
    validity: "",
    smsAPIService: false,
    whatsappAPIService: false,
    smsCount: "",
    userSMSCount: "",
    addMember: false,
  });

  const [plans, setPlans] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanData({
      ...planData,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update existing plan
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = planData;
      setPlans(updatedPlans);
      setEditingIndex(null);
    } else {
      // Add new plan
      setPlans([...plans, planData]);
    }
    // Reset form
    setPlanData({
      planName: "",
      price: "",
      validity: "",
      smsAPIService: false,
      whatsappAPIService: false,
      smsCount: "",
      userSMSCount: "",
      addMember: false,
    });
    alert("Plan Saved Successfully!");
  };

  const handleUpdate = (index) => {
    setPlanData(plans[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
    setEditingIndex(null);
  };

  return (
    <div className="Form mx-auto mt-10 p-6 rounded-lg shadow-lg max-w-4xl">
      <h2
        className="text-3xl font-bold mb-6 text-center text-[#640D5F]"
        style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}
      >
        Create Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="planName"
          placeholder="Plan Name"
          value={planData.planName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={planData.price}
          onChange={handleChange}
          min="0"
          required
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />
        <input
          type="number"
          name="validity"
          placeholder="Validity (Days)"
          value={planData.validity}
          onChange={handleChange}
          min="0"
          required
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />

        <div className="flex justify-between items-center">
          <label className="text-[#640D5F] font-bold">SMS API Service</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                name="smsAPIService"
                checked={planData.smsAPIService}
                onChange={handleChange}
                className="accent-[#640D5F]"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <label className="text-[#640D5F] font-bold">
            WhatsApp API Service
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                name="whatsappAPIService"
                checked={planData.whatsappAPIService}
                onChange={handleChange}
                className="accent-[#640D5F]"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>

        <input
          type="number"
          name="smsCount"
          placeholder="SMS Count"
          value={planData.smsCount}
          onChange={handleChange}
          min="0"
          required
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />
        <input
          type="number"
          name="userSMSCount"
          placeholder="User SMS Count"
          value={planData.userSMSCount}
          onChange={handleChange}
          min="0"
          required
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />

        <div className="flex justify-between items-center">
          <label className="text-[#640D5F] font-bold">Add Member</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                name="addMember"
                checked={planData.addMember}
                onChange={handleChange}
                className="accent-[#640D5F]"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="bg-[#aa1ba3] hover:bg-[#640D5F] text-white font-bold w-40 p-2 rounded-md transition-all duration-300"
          >
            {editingIndex !== null ? "Update Plan" : "Add Plan"}
          </button>
        </div>
      </form>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-[#fdf4ff] shadow-lg"
            style={{ boxShadow: "0px 4px 10px rgba(100, 13, 95, 0.5)" }}
          >
            <h3 className="text-xl font-extrabold text-[#640D5F] text-center uppercase">
              {plan.planName}
            </h3>

            <p className="text-gray-700 flex justify-between">
              <strong>Price:</strong> <span>${plan.price}</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>Validity:</strong> <span>{plan.validity} Days</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>SMS API:</strong>{" "}
              <span>{plan.smsAPIService ? "Yes" : "No"}</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>WhatsApp API:</strong>{" "}
              <span>{plan.whatsappAPIService ? "Yes" : "No"}</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>SMS Count:</strong> <span>{plan.smsCount}</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>User SMS Count:</strong> <span>{plan.userSMSCount}</span>
            </p>
            <p className="text-gray-700 flex justify-between">
              <strong>Add Member:</strong>{" "}
              <span>{plan.addMember ? "Yes" : "No"}</span>
            </p>

            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={() => handleUpdate(index)}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded transition-all duration-300"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-4 rounded transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePlan;