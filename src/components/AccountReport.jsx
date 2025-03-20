import React, { useState, useEffect } from "react";
import { FaDownload, FaCalendarAlt, FaSync, FaSearch, FaArrowLeft } from "react-icons/fa";

const AccountReport = () => {
    const [selectedReport, setSelectedReport] = useState("");
    const [membersDetails, setMembersDetails] = useState([]);
    const [selectedAssociate, setSelectedAssociate] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [commissionType, setCommissionType] = useState("With Commission/Intensive");
    const [reportType, setReportType] = useState("all");
    const [selectedLetter, setSelectedLetter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [filteredMembers, setFilteredMembers] = useState([]);

    // Sample data for customers/politicians
    const customersPoliticians = [
        { id: 1, name: "Politician A", type: "politician", addedBy: "John Doe", members: [{ name: "Member 1", mobile: "123-456-7890" }] },
        { id: 2, name: "Businessperson B", type: "businessperson", addedBy: "Jane Smith", members: [{ name: "Employee 1", mobile: "345-678-9012" }] },
        { id: 3, name: "Jolitician C", type: "politician", addedBy: "Alice Johnson", members: [{ name: "Member 2", mobile: "234-567-8901" }] },
        { id: 4, name: "Businessperson D", type: "businessperson", addedBy: "Bob Brown", members: [{ name: "Employee 2", mobile: "456-789-0123" }] },
        { id: 5, name: "Politician E", type: "politician", addedBy: "Charlie Davis", members: [{ name: "Member 3", mobile: "567-890-1234" }] },
        { id: 6, name: "Businessperson F", type: "businessperson", addedBy: "Diana Evans", members: [{ name: "Employee 3", mobile: "678-901-2345" }] },
    ];

    // Initialize filteredMembers with all customers/politicians when the report is selected
    useEffect(() => {
        if (selectedReport === "Customer/Politician Report") {
            setFilteredMembers(customersPoliticians);
        }
    }, [selectedReport]);

    // Handle search functionality
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term === "") {
            setFilteredMembers(customersPoliticians);
        } else {
            const filtered = customersPoliticians.filter((person) =>
                person.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredMembers(filtered);
        }
    };

    // Handle search box focus
    const handleSearchFocus = () => {
        setIsSearchDropdownOpen(true);
        setFilteredMembers(customersPoliticians);
    };

    // Handle search box blur
    const handleSearchBlur = () => {
        setTimeout(() => setIsSearchDropdownOpen(false), 200);
    };

    // Handle selection of a person from the dropdown
    const handlePersonSelect = (person) => {
        setSelectedCustomer(person);
        setSearchTerm(person.name);
        setIsSearchDropdownOpen(false);
    };

    // Handle report selection
    const handleReportSelect = (reportType) => {
        setSelectedReport(reportType);
        setSelectedAssociate("");
        setSelectedStaff("");
        setSelectedMonth("");
        setSearchTerm("");
        setSelectedCustomer("");
        setMembersDetails([]);
        setSelectedLetter("");
    };

    // Handle refresh
    const handleRefresh = () => {
        setSelectedReport("");
        setSelectedAssociate("");
        setSelectedStaff("");
        setSelectedMonth("");
        setSearchTerm("");
        setSelectedCustomer("");
        setMembersDetails([]);
        setSelectedLetter("");
    };

    // Handle download all reports
    const handleDownloadAll = () => {
        if (!selectedReport) {
            alert("Please select a report type.");
            return;
        }
        alert(`Downloading all ${selectedReport}`);
    };

    // Handle download individual associate report
    const handleDownloadAssociateReport = (associateName) => {
        alert(`Downloading report for ${associateName}`);
    };

    // Handle download individual staff report
    const handleDownloadStaffReport = (staffName) => {
        alert(`Downloading report for ${staffName}`);
    };

    // Handle download member addition report
    const handleDownloadMemberReport = (memberName) => {
        alert(`Downloading report for ${memberName}`);
    };

    // Handle download monthly profit report
    const handleDownloadMonthlyProfitReport = () => {
        if (!selectedMonth) {
            alert("Please select a month.");
            return;
        }
        alert(`Downloading monthly profit report for ${selectedMonth}`);
    };

    // Handle download all customers/politicians report
    const handleDownloadAllCustomersPoliticians = () => {
        alert("Downloading all customers/politicians report");
    };

    // Calculate current month members
    const calculateCurrentMonthMembers = (members) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const currentMonthMembers = members.filter((member) => {
            const joinDate = new Date(member.joinDate);
            return (
                joinDate.getMonth() === currentMonth &&
                joinDate.getFullYear() === currentYear
            );
        });

        return currentMonthMembers.length;
    };

    // Report types as cards
    const reportTypes = [
        { id: 1, name: "Associate Report", icon: <FaDownload className="text-2xl" /> },
        { id: 2, name: "Staff Report", icon: <FaDownload className="text-2xl" /> },
        { id: 3, name: "Monthly Profit Report", icon: <FaCalendarAlt className="text-2xl" /> },
        { id: 4, name: "Customer/Politician Report", icon: <FaDownload className="text-2xl" /> },
    ];

    // Sample data for associates
    const filteredAssociates = [
        {
            id: 1,
            name: "John Doe",
            mobile: "1234567890",
            totalMembers: 50,
            commission: "$500",
            members: [
                { id: 1, name: "Member 1", joinDate: "2023-10-15" },
                { id: 2, name: "Member 2", joinDate: "2023-09-20" },
                { id: 3, name: "Member 3", joinDate: "2023-10-05" },
            ],
        },
    ];

    // Sample data for staff members
    const staffMembers = [
        { id: 1, name: "Alice Johnson", mobileNumber: "9098789623", totalMembers: 20 },
        { id: 2, name: "Bob Brown", mobileNumber: "9098761234", totalMembers: 15 },
    ];

    return (
        <div className="Form mt-10 p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-lg">
            {/* Header with Refresh Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#640D5F]">Reports</h2>
                <button
                    className="p-2 bg-[#640D5F] text-white rounded-lg hover:bg-[#520a4a] transition-all focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:ring-offset-2"
                    onClick={handleRefresh}
                >
                    <FaSync className="text-xl" />
                </button>
            </div>

            {/* Report Type Selection as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {reportTypes.map((report) => (
                    <div
                        key={report.id}
                        className={`p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all ${selectedReport === report.name ? "ring-2 ring-[#640D5F]" : ""
                            }`}
                        onClick={() => handleReportSelect(report.name)}
                    >
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="text-[#640D5F]">{report.icon}</div>
                            <h3 className="text-lg font-semibold text-[#640D5F] text-center">{report.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Associate Report Section */}
            {selectedReport === "Associate Report" && (
                <div className="mb-6 mt-9">
                    <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Associate Report</h3>
                    <div className="space-y-4">
                        {/* Search Field and Download Button */}
                        <div className="flex items-center justify-between">
                            <div className="relative flex-grow mr-4">
                                <input
                                    type="text"
                                    placeholder="Search associates..."
                                    className="w-50 p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            <div className="relative group">
                                <div
                                    className="p-3 bg-[#640D5F] text-white rounded-lg shadow-md hover:bg-[#520a4a] transition-all cursor-pointer"
                                    onClick={handleDownloadAll}
                                >
                                    <FaDownload className="text-xl" />
                                </div>
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Download All Reports
                                </div>
                            </div>
                        </div>

                        {/* Associate Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-[#d64fcf] text-white">
                                    <tr>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Mobile</th>
                                        <th className="p-3 text-left">Total Members</th>
                                        <th className="p-3 text-left">Current Month Members Added</th>
                                        <th className="p-3 text-left">Commission</th>
                                        <th className="p-3 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssociates.map((associate) => (
                                        <tr key={associate.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-3 border-b border-gray-200">{associate.name}</td>
                                            <td className="p-3 border-b border-gray-200">{associate.mobile}</td>
                                            <td className="p-3 border-b border-gray-200">{associate.totalMembers}</td>
                                            <td className="p-3 border-b border-gray-200">
                                                {calculateCurrentMonthMembers(associate.members)}
                                            </td>
                                            <td className="p-3 border-b border-gray-200">{associate.commission}</td>
                                            <td className="p-3 border-b border-gray-200">
                                                <button
                                                    className="text-[#640D5F] hover:text-[#8A1C7C] transition-colors"
                                                    onClick={() => handleDownloadAssociateReport(associate.name)}
                                                >
                                                    <FaDownload className="text-xl" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Staff Report Section */}
            {selectedReport === "Staff Report" && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Staff Report</h3>
                    <div className="space-y-4">
                        {/* Search Field and Download Button */}
                        <div className="flex justify-between">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search staff..."
                                    className="w-50 p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            <button
                                className="px-6 py-3 bg-[#640D5F] text-white rounded-lg shadow-md hover:bg-[#520a4a] transition-all focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:ring-offset-2 flex items-center"
                                onClick={handleDownloadAll}
                            >
                                <FaDownload className="mr-2" />
                                Download All Staff Reports
                            </button>
                        </div>

                        {/* Staff Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-[#d64fcf] text-white">
                                    <tr>
                                        <th className="p-3 text-center">Name</th>
                                        <th className="p-3 text-center">Mobile Number</th>
                                        <th className="p-3 text-center">Total Members</th>
                                        <th className="p-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffMembers.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-3 text-center border-b border-gray-200">{staff.name}</td>
                                            <td className="p-3 text-center border-b border-gray-200">{staff.mobileNumber}</td>
                                            <td className="p-3 text-center border-b border-gray-200">{staff.totalMembers}</td>
                                            <td className="p-3 text-center border-b border-gray-200">
                                                <button
                                                    className="text-[#640D5F] hover:text-[#8A1C7C] transition-colors"
                                                    onClick={() => handleDownloadStaffReport(staff.name)}
                                                >
                                                    <FaDownload className="text-xl" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Monthly Profit Report Section */}
            {selectedReport === "Monthly Profit Report" && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Monthly Profit Report</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                            <div className="flex flex-wrap justify-between items-center">
                                <input
                                    type="month"
                                    className="w-100 p-3 border border-[#640D5F] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                />
                                <select
                                    value={commissionType}
                                    onChange={(e) => setCommissionType(e.target.value)}
                                    className="mx-4 p-3 py-4 border border-[#640D5F] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                                >
                                    <option value="With Commission/Intensive">With Commission/Incentive</option>
                                    <option value="Without Commission/Intensive">Without Commission/Incentive</option>
                                </select>
                                <button
                                    className="px-6 py-4 bg-[#640D5F] text-white rounded-lg shadow-md hover:bg-[#520a4a] transition-all focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:ring-offset-2 flex items-center"
                                    onClick={handleDownloadMonthlyProfitReport}
                                >
                                    <FaDownload className="mr-2" />
                                    Download Monthly Profit Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer/Politician Report Section */}
           {/* Customer/Politician Report Section */}
{selectedReport === "Customer/Politician Report" && (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-[#640D5F]">Customer/Politician Report</h3>
        <div className="space-y-4">
            {/* Dropdown for selecting category */}
            <div className="flex items-center gap-4 mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedCustomer(null);
                    }}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                >
                    <option value="all">All</option>
                    <option value="politician">Politician</option>
                    <option value="businessperson">Customer</option>
                </select>

                {/* Search Field with Dropdown */}
                <div className="relative flex-grow">
                    <input
                        type="search"
                        placeholder="Search by name..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />

                    {/* Dropdown for Search Results */}
                    {isSearchDropdownOpen && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                            {filteredMembers
                                .filter((person) => {
                                    const matchesCategory =
                                        selectedCategory === "all" ||
                                        (selectedCategory === "politician" && person.type === "politician") ||
                                        (selectedCategory === "businessperson" && person.type === "businessperson");

                                    const matchesSearchTerm = person.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase());

                                    return matchesCategory && matchesSearchTerm;
                                })
                                .map((person) => (
                                    <div
                                        key={person.id}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onMouseDown={() => handlePersonSelect(person)} // Use onMouseDown instead of onClick
                                    >
                                        {person.name}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Conditional Rendering: Main Table OR Employee List */}
            {!selectedCustomer ? (
                // Main Table (Customers/Politicians)
                <div className="mt-6">
                    <div className="my-6 flex items-center justify-between">
                        <h4 className="text-lg font-semibold mb-2 text-[#640D5F]">
                            {selectedCategory === "all"
                                ? "All Customers/Politicians"
                                : selectedCategory === "politician"
                                ? "Politicians"
                                : "Businesspersons"}
                        </h4>
                        <button
                            className="flex items-center px-4 py-2 bg-[#640D5F] text-white rounded-lg shadow-md hover:bg-[#520a4a] transition-all focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:ring-offset-2"
                            onClick={handleDownloadAllCustomersPoliticians}
                        >
                            <FaDownload className="mr-2" />
                            Download All Reports
                        </button>
                    </div>

                    {/* Customers/Politicians Table */}
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-[#d64fcf] text-white">
                            <tr>
                                <th className="p-3 text-center">Sr. No.</th>
                                <th className="p-3 text-center">Name</th>
                                <th className="p-3 text-center">Added By</th>
                                <th className="p-3 text-center">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers
                                .filter((person) => {
                                    const matchesCategory =
                                        selectedCategory === "all" ||
                                        (selectedCategory === "politician" && person.type === "politician") ||
                                        (selectedCategory === "businessperson" && person.type === "businessperson");

                                    const matchesSearchTerm = person.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase());

                                    return matchesCategory && matchesSearchTerm;
                                })
                                .map((person, index) => (
                                    <tr
                                        key={person.id}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedCustomer(person)}
                                    >
                                        <td className="p-3 text-center border-b border-gray-200">{index + 1}</td>
                                        <td className="p-3 text-center border-b border-gray-200">{person.name}</td>
                                        <td className="p-3 text-center border-b border-gray-200">{person.addedBy || "N/A"}</td>
                                        <td className="p-3 text-center border-b border-gray-200">{person.members.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Employee List of Selected Customer
                <div className="mt-6">
                    <div className="my-6 flex items-center justify-between">
                        <h4 className="text-lg font-semibold mb-2 text-[#640D5F]">
                            Employees of {selectedCustomer.name}
                        </h4>
                        <div className="flex gap-2">
                            <button
                                className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                onClick={() => setSelectedCustomer(null)}
                            >
                                <FaArrowLeft className="mr-2" /> Back
                            </button>
                            <button
                                className="flex items-center px-4 py-2 bg-[#640D5F] text-white rounded-lg shadow-md hover:bg-[#520a4a] transition-all focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:ring-offset-2"
                                onClick={() => handleDownloadMemberReport(selectedCustomer.name)}
                            >
                                <FaDownload className="mr-2" />
                                Download Members Report
                            </button>
                        </div>
                    </div>

                    {/* Employees Table */}
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-[#d64fcf] text-white">
                            <tr>
                                <th className="p-3 text-center">Sr. No.</th>
                                <th className="p-3 text-center">Employee Name</th>
                                <th className="p-3 text-center">Mobile No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer.members.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-center border-b border-gray-200">{index + 1}</td>
                                    <td className="p-3 text-center border-b border-gray-200">{member.name}</td>
                                    <td className="p-3 text-center border-b border-gray-200">{member.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
)}
        </div>
    );
};

export default AccountReport;