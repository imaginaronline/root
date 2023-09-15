import { Navigate, Route, Routes } from "react-router-dom";
import CommunicationsComponent from "../pages/admin/CommunicationPage/CommunicationComponent";
import { useState } from "react";
import Sidebar from "../assets/sidebar.png";
import AdminMainSideNav from "../pages/admin/AdminMainLayout/AdminMainSideNav";
import AdminIsconMainImg from "../pages/admin/AdminMainLayout/AdminIsconMainImg";
import AdminMainMenuNav from "../pages/admin/AdminMainLayout/AdminMainMenuNav";
import AdminSideBar from "../pages/admin/AdminMainLayout/AdminSideBar";
import ManageActivitiesComponent from "../pages/admin/ManageActivitiesPage/ManageActivitiesComponent";
import TransactionPage from "../pages/admin/TransactionsPage/TransactionsPage";

export default function AdminLayout() {
  const [showNav, setshowNav] = useState(false);

  function handleNavToggleOpen() {
    setshowNav(!showNav);
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row admincontainer">
          <div className="col-md-1 admleftnav">
            <AdminMainSideNav />
          </div>
          <div className="col-md-11 admmainpagecontent right-section">
            <div>
              <div>
                <AdminIsconMainImg />
              </div>
            </div>
            <div className="row content-area">
              <div className="col-md-12">
                <div className={`maincontentarea ${showNav ? "show" : ""}`}>
                  <div className="admmain">
                    <Routes>
                      <Route path="*" element={<Navigate to="/admin/adminDashboard" />} />
                      <Route path="/adminDashboard" element={<AdminMainMenuNav />} />
                      <Route path="/communication" element={<CommunicationsComponent />} />
                      <Route path="/manageactivities" element={<ManageActivitiesComponent />} />
                      <Route path="/transactions" element={<TransactionPage />} />
                      
                      {/* Fallback route for unmatched paths */}
                      {/* <Route path="*" element={<Navigate to="/*" />} /> */}
                    </Routes>
                  </div>
                  <div className={`admrightnav ${showNav ? "show" : ""}`}>
                    <button
                      className="admintoglbtn mt-2"
                      value="btn1"
                      onClick={handleNavToggleOpen}
                    >
                      <img
                        className="admintogleimg"
                        src={Sidebar}
                        alt="img"
                      />
                    </button>
                    <AdminSideBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
