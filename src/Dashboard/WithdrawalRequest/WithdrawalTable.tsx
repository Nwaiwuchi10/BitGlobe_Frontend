import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { Base_url } from "../../Api/BaseUrl";

interface Withdrawal {
  amount: number;
  country: string;
  state: string;
  accNumber: string;
  bank: string;
  status: string;
  createdAt: string;
}

const UserWithdrawalTable: React.FC<{}> = () => {
  const userId = localStorage.getItem("userId");
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Withdrawal[]>(
        `${Base_url}/tradingaccount/user/${userId}/withdrawals/all`
      );
      setWithdrawals(res.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [userId]);

  return (
    <UserDashboardLayout>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4">
          Withdrawals History
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Bank</th>
                <th className="border px-3 py-2">Account</th>
                <th className="border px-3 py-2">Country</th>
                <th className="border px-3 py-2">State</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length > 0 ? (
                withdrawals.map((w, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="border px-3 py-2 font-semibold text-blue-900">
                      ${w.amount}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">{w.bank}</td>
                    <td className="border px-3 py-2 text-blue-900">
                      {w.accNumber}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {w.country}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {w.state}
                    </td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        w.status === "approved"
                          ? "text-green-600"
                          : w.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {w.status}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {new Date(w.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500 py-4 border"
                  >
                    No withdrawals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserWithdrawalTable;
