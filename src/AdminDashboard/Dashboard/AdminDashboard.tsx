// src/layouts/UserDashboardLayout.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/bitcon.png";
interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-darkblue">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white text-darkblue shadow-lg transition-transform duration-300 ease-in-out border-r border-gray-200
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-700">Admin Dashboard</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-blue-900" /> {/* Dark blue close icon */}
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            🏠 <Link to="/admin/dashboard">Home</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/view/deposit"> Deposit Request</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/view/withdrawals">Withdrawal Request</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/view/wallet">View Admin Wallet</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/add/wallet">Add Admin Wallet</Link>
          </a>

          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/add/plan">Add Investment Plan</Link>
          </a>

          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/view/plan">View Investment Plan</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            📄 <Link to="/admin/dashboard">Show All Users</Link>
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            ⚙️ Settings
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-900">
            🚪 Logout
          </a>
        </nav>
      </aside>

      {/* Content Wrapper */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white text-darkblue shadow px-4 py-3 border-b border-gray-200">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-blue-900" />{" "}
            {/* Dark blue menu icon */}
          </button>
          <h1 className="text-lg font-semibold text-blue-900">
            <a href="#">
              <span className="flex justify-evenly items-center gap-6">
                <span style={{ width: "auto", height: "30px" }}>
                  {" "}
                  <img
                    src={Logo}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />{" "}
                </span>

                <span className="text-2xl font-extrabold">BitGlobe</span>
              </span>
            </a>
            {/* Welcome Back 👋 */}
          </h1>
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
