import React, { useState } from "react";

const Politician_Msg = () => {
  const dummyPoliticians = [
    { id: 1, name: "John Doe", phone: "+1234567890" },
    { id: 2, name: "Jane Smith", phone: "+0987654321" },
    { id: 3, name: "Alice Johnson", phone: "+1122334455" },
    { id: 4, name: "Bob Brown", phone: "+5566778899" },
    { id: 5, name: "Charlie Davis", phone: "+9988776655" },
  ];

  const [messageType, setMessageType] = useState("Text Message");
  const [formData, setFormData] = useState({
    templateName: "",
    message: "",
    image: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPoliticians, setFilteredPoliticians] = useState([]);
  const [selectedPolitician, setSelectedPolitician] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredPoliticians(
      dummyPoliticians.filter(
        (politician) =>
          politician.name.toLowerCase().includes(query.toLowerCase()) ||
          politician.phone.includes(query)
      )
    );
  };

  const handlePoliticianSelect = (politician) => {
    setSelectedPolitician(politician);
    setSearchQuery(politician.name);
    setFilteredPoliticians([]);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPolitician) {
      alert("Please select a politician.");
      return;
    }
    setIsDialogOpen(true);
    console.log("Form Data:", { ...formData, politician: selectedPolitician, type: messageType });
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="Form mx-auto mt-10 p-6 rounded-lg shadow-lg max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-[#640D5F] text-center" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>
        Create Message
      </h2>

      {/* Search and Select Politician */}
      <div>
        <label className="text-[#640D5F] font-bold">Select Politician:</label>
        <input
          type="text"
          placeholder="Search for a politician..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-md border border-[#640D5F]"
        />
        {filteredPoliticians.length > 0 && (
          <ul className="mt-2 bg-white border border-[#640D5F] rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredPoliticians.map((politician) => (
              <li
                key={politician.id}
                onClick={() => handlePoliticianSelect(politician)}
                className="p-2 hover:bg-[#fdf4ff] cursor-pointer"
              >
                {politician.name} - {politician.phone}
              </li>
            ))}
          </ul>
        )}
        {selectedPolitician && (
          <p className="mt-2 text-sm text-[#640D5F]">
            Selected Politician: <strong>{selectedPolitician.name}</strong>
          </p>
        )}
      </div>

      {/* Toggle Design */}
      <div className="flex items-center justify-center bg-[#ebace8] rounded-full p-1 w-full max-w-md mx-auto mt-4">
        {["Text Message", "WhatsApp Message"].map((type) => (
          <div
            key={type}
            className={`flex-1 text-center py-2 rounded-full cursor-pointer transition-all font-semibold text-lg ${
              messageType === type ? "bg-[#640D5F] text-white" : "text-black"
            }`}
            onClick={() => setMessageType(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Message Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="text-[#640D5F] font-bold">Template Name:</label>
          <input
            type="text"
            name="templateName"
            placeholder="Enter template name..."
            value={formData.templateName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md border border-[#640D5F]"
          />
        </div>

        <div>
          <label className="text-[#640D5F] font-bold">Message:</label>
          <textarea
            name="message"
            placeholder="Enter your message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md border border-[#640D5F]"
            rows="4"
          />
        </div>

        {/* Image Upload (Only for WhatsApp) */}
        {messageType === "WhatsApp Message" && (
          <div>
            <label className="text-[#640D5F] font-bold">Image (for WhatsApp only):</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-[#640D5F]"
            />
          </div>
        )}

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="bg-[#aa1ba3] hover:bg-[#640D5F] text-white font-bold w-40 p-2 rounded-md transition-all duration-300"
          >
            Create Message
          </button>
        </div>
      </form>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold text-[#640D5F]">
              Your {messageType.toLowerCase()} is created successfully!
            </p>
            <button
              onClick={closeDialog}
              className="mt-4 bg-[#aa1ba3] hover:bg-[#640D5F] text-white font-bold py-1 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Politician_Msg;
