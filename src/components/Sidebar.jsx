import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, ChevronDown, ChevronRight, Users, Briefcase, Bell, FilePlus, Settings, File, UserPlus, User } from "lucide-react";
import { FaQuestionCircle } from "react-icons/fa";
import "./application.css";

const Sidebar = ({ onMenuClick }) => {
  const [isPoliticianOpen, setIsPoliticianOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isAssociateOpen, setIsAssociateOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAssociateDetailsOpen, setIsAssociateDetailsOpen] = useState(false); // New state for Associate details dropdown
  const [isStaffDetailsOpen, setIsStaffDetailsOpen] = useState(false); // New state for Staff details dropdown

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <div className="w-78 sidebar-container min-h-screen bg-gray-100 p-4 shadow-lg fixed top-0 left-0 h-full overflow-y-auto">
      <h2 className="text-2xl sidebar_title font-bold mb-6 text-[#640D5F] text-center" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)"}}>
        ADMIN PANEL
      </h2>

      <ul className="space-y-1">
        {/* Home */}
        <li className="flex items-center py-2 px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("home")}>
          <Home className="w-5 h-5 mr-2 text-blue-600" />
          Home
        </li>

        {/* Business Dropdown */}
        <li>
          <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsBusinessOpen(!isBusinessOpen)}>
            <span className="flex py-2 text-lg font-semibold items-center">
              <Briefcase className="w-5 h-5 mr-2 text-yellow-600" />
              Business
            </span>
            {isBusinessOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isBusinessOpen ? "visible" : "hidden"} variants={dropdownVariants}>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("addCustomer")}>Add Customer</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("selectPlan")}>Select Plan</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("employeeManagement")}>Employee Management</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("customerUpdation")}>Customer Updation</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("customerMsg")}>Create Message</li>
          </motion.ul>
        </li>

        {/* Politician Dropdown */}
        <li>
          <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsPoliticianOpen(!isPoliticianOpen)}>
            <span className="flex text-lg font-semibold py-2 items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Politician
            </span>
            {isPoliticianOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isPoliticianOpen ? "visible" : "hidden"} variants={dropdownVariants}>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("addPolitician")}>Add Politician</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("selectPlan")}>Select Plan</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("memberManagement")}>Member Management</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("politicianUpdation")}>Politician Updation</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("politicianMsg")}>Create Message</li>
          </motion.ul>
        </li>

        {/* Staff Management Dropdown */}
        <li>
          <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsStaffOpen(!isStaffOpen)}>
            <span className="flex text-lg font-semibold py-2 items-center">
              <User  Plus className="w-5 h-5 mr-2 text-pink-600" />
              Staff Management
            </span>
            {isStaffOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isStaffOpen ? "visible" : "hidden"} variants={dropdownVariants}>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("addStaff")}>Add Staff</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("staffUpdation")}>Staff Updation</li>
          </motion.ul>
        </li>

        {/* Associate Management Dropdown */}
        <li>
          <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsAssociateOpen(!isAssociateOpen)}>
            <span className="flex text-lg font-semibold py-2 items-center">
              <User  Plus className="w-5 h-5 mr-2 text-purple-600" />
              Associate Management
            </span>
            {isAssociateOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isAssociateOpen ? "visible" : "hidden"} variants={dropdownVariants}>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("addAssociate")}>Add Associate</li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("associateUpdation")}>Associate Updation</li>
          </motion.ul>
        </li>

        {/* Account Dropdown */}
        <li>
          <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsAccountOpen(!isAccountOpen)}>
            <span className="flex text-lg font-semibold py-2 items-center">
              <User  className="w-5 h-5 mr-2 text-[#640D5F]" />
              Account
            </span>
            {isAccountOpen ? <ChevronDown /> : <ChevronRight />}
          </button>
          <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isAccountOpen ? "visible" : "hidden"} variants={dropdownVariants}>
            {/* Staff Dropdown under Account */}
            <li>
              <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsStaffDetailsOpen(!isStaffDetailsOpen)}>
                <span className="flex text-md font-semibold py-2 items-center">
                  <User  className="w-4 h-4 mr-2 text-[#640D5F]" />
                  Staff
                </span>
                {isStaffDetailsOpen ? <ChevronDown /> : <ChevronRight />}
              </button>
              <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isStaffDetailsOpen ? "visible" : "hidden"} variants={dropdownVariants}>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("staffUserDetails")}>User  Details</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("staffPayout")}>Payout</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("staffPayoutsetting")}>Payout Setting</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("staffHistory")}>History</li>
              </motion.ul>
            </li>
            {/* Associate Dropdown under Account */}
            <li>
              <button className="flex items-center justify-between w-full px-3 hover:bg-[#ebace8] rounded-md transition-all" onClick={() => setIsAssociateDetailsOpen(!isAssociateDetailsOpen)}>
                <span className="flex text-md font-semibold py-2 items-center">
                  <User  className="w-4 h-4 mr-2 text-[#640D5F]" />
                  Associate
                </span>
                {isAssociateDetailsOpen ? <ChevronDown /> : <ChevronRight />}
              </button>
              <motion.ul className="ml-4 mt-1 bg-[#fdfcfd] shadow-md rounded-lg" initial="hidden" animate={isAssociateDetailsOpen ? "visible" : "hidden"} variants={dropdownVariants}>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("associateUserDetails")}>User  Details</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("associatePayout")}>Payout</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("associatePayoutsetting")}>Payout Setting</li>
                <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("associateHistory")}>History</li>
              </motion.ul>
            </li>
            <li className="p-2 cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("accountReport")}>Reports</li>
          </motion.ul>
        </li>

        {/* Notifications */}
        <li className="py-2 flex items-center mt-0 px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("notification")}>
          <Bell className="w-5 h-5 mr-2 text-red-600" />
          Notifications
        </li>

        {/* Configuration */}
        <li className="py-2 flex items-center mt-0 px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("configuration")}>
          <Settings className="w-5 h-5 mr-2 text-sky-900" />
          Configuration
        </li>

        {/* Create Plan */}
        <li className="py-2 flex items-center px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("createPlan")}>
          <FilePlus className="w-5 h-5 mr-2 text-[#640D5F]" />
          Create Plan
        </li>

        <li className="py-2 flex items-center px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("reports")}>
          <File className="w-5 h-5 mr-2 text-sky-800" />
          Report
        </li>

        <li className="py-2 flex items-center px-3 text-lg font-semibold cursor-pointer hover:bg-[#ebace8] rounded-md" onClick={() => onMenuClick("enquiry")}>
          <FaQuestionCircle className="w-5 h-5 mr-2 text-orange-500" />
          Enquiry
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;