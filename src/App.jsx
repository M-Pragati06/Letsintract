import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AddPolitician from "./pages/AddPolitician";
import MemberManagement from "./pages/MemberManagement";
import PoliticianUpdation from "./pages/PoliticianUpdation";
import Configuration from "./pages/Configuration";
import Notification from "./pages/Notification";
import AddCustomer from "./components/AddCustomer";
import CustomerUpdation from "./components/CustomerUpdation";
import SelectPlan from "./components/SelectPlan";
import CreatePlan from "./components/CreatePlan";
import Home from "./components/Home";
import './components/application.css'
import Customer_Msg from "./components/Customer_Msg";
import Politician_Msg from "./components/Politician-Msg";
import Reports from "./components/Reports";
import AddStaff from "./components/AddStaff";
import AddAssociate from "./components/AddAssociate";
import StaffUpdation from "./components/StaffUpdation";
import AssociateUpdation from "./components/AssociateUpdation";
import Payout from "./components/AssociatePayout";
import PayoutSetting from "./components/AssociatePayoutSetting";
import AccountReport from "./components/AccountReport";
import History from "./components/AssociateHistory";
import EmployeeManagement from "./components/EmployeeManagement";
import AssociateUserDetails from "./components/AssociateUserDetails";
import AssociatePayout from "./components/AssociatePayout";
import AssociatePayoutSetting from "./components/AssociatePayoutSetting";
import AssociateHistory from "./components/AssociateHistory";
import StaffPayout from "./components/StaffPayout";
import StaffPayoutSetting from "./components/StaffPayoutSetting";
import StaffHistory from "./components/StaffHistory";
import StaffUserDetails from "./components/StaffUserDetails";
import Enquiry from "./components/Enquiry";
import Login from "./components/Login";

const App = () => {
  const [activeContent, setActiveContent] = useState("home");
  const [history, setHistory] = useState([]); // Lift history state to App component

  const handleMenuClick = (menu) => {
    setActiveContent(activeContent === menu ? null : menu);
  };

  const handleLogout = () => {
    alert("Logging out..."); // Replace with actual logout functionality
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onMenuClick={handleMenuClick} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-78">
        {/* Fixed Navbar */}
        <nav className="bg-[#640D5F] navbar text-white p-4 py-3 flex items-center justify-between fixed top-0 left-78 right-0 z-50">
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </nav>
        
        {/* Content Section with Top Padding to Prevent Overlapping */}
        <div className="flex-grow p-4 pt-16">
          {activeContent === "home" && <Home />}
          {activeContent === "addPolitician" && <AddPolitician />}
          {activeContent === "employeeManagement" && <EmployeeManagement/>}
          {activeContent === "memberManagement" && <MemberManagement />}
          {activeContent === "politicianUpdation" && <PoliticianUpdation />}
          {activeContent === "configuration" && <Configuration />}
          {activeContent === "notification" && <Notification />}
          {activeContent === "addCustomer" && <AddCustomer />}
          {activeContent === "customerUpdation" && <CustomerUpdation />}
          {activeContent === "selectPlan" && <SelectPlan />}
          {activeContent === "createPlan" && <CreatePlan />}
          {activeContent === "customerMsg" && <Customer_Msg />}
          {activeContent === "politicianMsg" && <Politician_Msg />}
          {activeContent === "reports" && <Reports />}
          {activeContent === "addStaff" && <AddStaff />}
          {activeContent === "addAssociate" && <AddAssociate />}
          {activeContent === "staffUpdation" && <StaffUpdation />}
          {activeContent === "associateUpdation" && <AssociateUpdation />}
          {/* New Account Dropdown Sections */}
          {activeContent === "associateUserDetails" && <AssociateUserDetails />}
          {activeContent === "associatePayout" && <AssociatePayout history={history} setHistory={setHistory} />}
          {activeContent === "associatePayoutsetting" && <AssociatePayoutSetting/> }
          {activeContent === "accountReport" && <AccountReport/> }
          {activeContent === "associateHistory" && <AssociateHistory history={history} />}
          {activeContent === "staffUserDetails" && <StaffUserDetails />}
          {activeContent === "staffPayoutsetting" && <StaffPayoutSetting/> }
          {activeContent === "staffHistory" && <StaffHistory history={history} />}
          {activeContent === "staffPayout" && <StaffPayout history={history} setHistory={setHistory} />}
          {activeContent === "enquiry" && <Enquiry/> }
        </div>
      </div>
    </div>
  );
};

export default App;
