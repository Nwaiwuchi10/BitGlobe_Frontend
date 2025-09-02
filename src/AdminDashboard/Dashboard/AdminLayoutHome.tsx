import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboard";
import { GetAllUsersApi } from "../../Api/Api";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode: string;
  referredBy?: string | null;
  referralBalance: number;
  createdAt?: string; // made optional
}

const AdminDashboardHome: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get<User[]>(GetAllUsersApi);
      console.log("Fetched Users:", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users by firstName or lastName
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Users</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by First or Last Name"
            className="w-full md:w-1/3 text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-darkblue focus:border-darkblue"
          />
        </div>

        {/* Responsive Table */}
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle bg-white shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                <thead className="bg-darkblue text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-blue-900">Name</th>
                    <th className="px-4 py-3 text-left text-blue-900">Email</th>
                    <th className="px-4 py-3 text-left text-blue-900">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-blue-900">
                      Referral Code
                    </th>
                    <th className="px-4 py-3 text-left text-blue-900">
                      Referred By
                    </th>
                    <th className="px-4 py-3 text-left text-blue-900">
                      Balance
                    </th>
                    <th className="px-4 py-3 text-left text-blue-900">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 text-blue-900 transition duration-150"
                      >
                        <td className="px-4 py-3 font-medium text-blue-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-4 py-3 text-blue-900 underline">
                          <Link to={`/admin/dashboard/users/page/${user._id}`}>
                            {user.email}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-blue-900">
                          {user.country}
                        </td>
                        <td className="px-4 py-3 text-blue-900">
                          {user.referralCode}
                        </td>
                        <td className="px-4 py-3 text-blue-900">
                          {user.referredBy || (
                            <span className="text-blue-900">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-green-600 font-semibold">
                          ${user.referralBalance?.toFixed(2) ?? "0.00"}
                        </td>
                        <td className="px-4 py-3 text-blue-900">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-4 text-blue-900"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboardHome;
