// src/layouts/UserDashboardLayout.tsx
import React, { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react"; // Lucide icons
import { Menu } from "@headlessui/react"; // Dropdown menu
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/bitcon.png";
import axios from "axios";
import { Base_url } from "../../Api/BaseUrl";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
}) => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if (userId) {
        const res = await axios.get<User>(`${Base_url}/users/${userId}`);
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

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
          <h2 className="text-xl font-bold text-blue-700">User Dashboard</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-blue-900" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            🏠 Home
          </Link>
          <Link
            to="/dashboard/deposit"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            📄 Deposit
          </Link>
          <Link
            to="/dashboard/invest"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            📄 Invest
          </Link>
          <Link
            to="/dashboard/acc"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            📄 Trading Account
          </Link>
          <Link
            to="/dashboard/ref/acc"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            📄 Referral Account
          </Link>
          <Link
            to="/change-password"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            ⚙️ Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-blue-900"
          >
            🚪 Logout
          </button>
          {/* <Link
            to="/adminPage"
            className="block px-3 py-2 rounded-lg text-blue-900"
          >
            Admin Link (for test)
          </Link> */}
        </nav>
      </aside>

      {/* Content Wrapper */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white text-darkblue shadow px-4 py-3 border-b border-gray-200">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="w-6 h-6 text-blue-900" />
          </button>

          <h1 className="text-lg font-semibold text-blue-900">
            <span className="flex items-center gap-6">
              <span style={{ width: "auto", height: "30px" }}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </span>
              <span className="text-2xl font-extrabold">Bit Globe</span>
            </span>
          </h1>

          {/* User Profile Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="text-sm font-medium text-blue-900">
              {user?.firstName} {user?.lastName}
            </div>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                  alt="User"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/profile")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                        }`}
                      >
                        View Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/change-password")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                        }`}
                      >
                        Change Password
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
