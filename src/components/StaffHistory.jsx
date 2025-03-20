import React, { useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa"; // Icons for view and download
import jsPDF from "jspdf"; // Import jsPDF

const StaffHistory = ({ history }) => {
  const [timePeriod, setTimePeriod] = useState("all"); // State to manage the selected time period

  // Function to filter history based on the selected time period
  const filteredHistory = history.filter((entry) => {
    const entryDate = new Date(entry.date); // Assuming each entry has a 'date' field
    const currentDate = new Date();
    const timeDiff = currentDate - entryDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (timePeriod === "weekly") {
      return daysDiff <= 7;
    } else if (timePeriod === "monthly") {
      return daysDiff <= 30;
    } else {
      return true; // Show all history
    }
  });

  // Function to handle the "View" action
  const handleView = (entry) => {
    // Logic to view details of the entry
    alert(`Viewing details for: ${entry.user.name}\nAmount: $${entry.amount}\nPayment Via: ${entry.paymentMode}\nMessage: ${entry.message}`);
  };

  // Function to handle the "Download" action for a single entry
  const handleDownload = (entry) => {
    const doc = new jsPDF();
    doc.text(`Payout Details for ${entry.user.name}`, 10, 10);
    doc.text(`Amount: $${entry.amount}`, 10, 20);
    doc.text(`Payment Via: ${entry.paymentMode}`, 10, 30);
    doc.text(`Message: ${entry.message}`, 10, 40);
    doc.text(`Date: ${new Date(entry.date).toLocaleDateString()}`, 10, 50);
    doc.save(`payout_${entry.user.name}.pdf`);
  };

  // Function to handle the "Download All" action
  const handleDownloadAll = () => {
    const doc = new jsPDF();
    doc.text("All Payouts", 10, 10);
    let y = 20;

    filteredHistory.forEach((entry, index) => {
      doc.text(`Payout ${index + 1}:`, 10, y);
      doc.text(`Name: ${entry.user.name}`, 10, y + 10);
      doc.text(`Mobile: ${entry.user.mobile}`, 10, y + 20);
      doc.text(`Payment Date: ${new Date(entry.date).toLocaleDateString()}`, 10, y + 30);
      doc.text(`Payment Via: ${entry.paymentMode}`, 10, y + 40);
      doc.text(`Amount: $${entry.amount}`, 10, y + 50);
      doc.text(`Message: ${entry.message}`, 10, y + 60);
      y += 70; // Move down for the next entry
    });

    doc.save("all_payouts.pdf");
  };

  return (
    <div className="Form payment_history p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#640D5F]" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}>Staff Payment History</h2>
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium">Filter by:</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] bg-white"
          >
            <option value="all">All</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            onClick={handleDownloadAll}
            className="flex items-center px-2 py-2 bg-[#640D5F] text-white rounded-md hover:bg-[#8A1C7C] transition-colors duration-200"
          >
            <FaDownload className="mr-2" />
            Download All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#640D5F] to-[#8A1C7C]">
            <tr>
              <th className="p-4 text-left text-white font-semibold">Name</th>
              <th className="p-4 text-left text-white font-semibold">Mobile</th>
              <th className="p-4 text-left text-white font-semibold">Payment Date</th>
              <th className="p-4 text-left text-white font-semibold">Payment Via</th>
              <th className="p-4 text-left text-white font-semibold">Amount</th>
              <th className="p-4 text-left text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-200">{entry.user.name}</td>
                  <td className="p-4 border-b border-gray-200">{entry.user.mobile}</td>
                  <td className="p-4 border-b border-gray-200">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="p-4 border-b border-gray-200">{entry.paymentMode}</td>
                  <td className="p-4 border-b border-gray-200 font-medium text-[#640D5F]">${entry.amount}</td>
                  <td className="p-4 border-b border-gray-200">
                    <div className="flex space-x-4">
                      <button
                        className="text-[#640D5F] hover:text-[#8A1C7C] transition-colors duration-200"
                        onClick={() => handleView(entry)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-[#640D5F] hover:text-[#8A1C7C] transition-colors duration-200"
                        onClick={() => handleDownload(entry)}
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No payout history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffHistory;