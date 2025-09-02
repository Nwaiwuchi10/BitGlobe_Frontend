// src/components/WithdrawalTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../Dashboard/AdminDashboard";
import { ApproveWithdrawalApi, GetAllWithdrawalsApi } from "../../Api/Api";

// const GetAllWithdrawalsApi = "http://localhost:5000/tradingaccount/all/withdrawals";
// const ApproveWithdrawalApi = "http://localhost:5000/tradingaccount/withdrawals";
// 👆 adjust with your backend URL

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Withdrawal {
  _id: string;
  amount: number;
  country: string;
  state: string;
  accNumber: string;
  bank: string;
  status: string;
  createdAt: string;
  client: Client;
}

const WithdrawalTable: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch withdrawals
  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Withdrawal[]>(GetAllWithdrawalsApi);
      setWithdrawals(res.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Approve withdrawal
  const approveWithdrawal = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.patch(`${ApproveWithdrawalApi}/${id}/approve`);
      setMessage(res.data.message);
      await fetchWithdrawals(); // refresh after approval
    } catch (error: any) {
      console.error("Error approving withdrawal:", error);
      setMessage(error.response?.data?.message || "Approval failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4">
          Withdrawals Management
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">{message}</p>
        )}

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="border px-3 py-2 text-left">Client</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Bank</th>
                <th className="border px-3 py-2 text-left">Account No</th>
                <th className="border px-3 py-2 text-left">Country</th>
                <th className="border px-3 py-2 text-left">State</th>
                <th className="border px-3 py-2 text-left">Amount</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Created</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length > 0 ? (
                withdrawals.map((w) => (
                  <tr
                    key={w._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="border px-3 py-2 text-blue-900">
                      {w.client?.firstName} {w.client?.lastName}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {w.client?.email}
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
                    <td className="border px-3 py-2 font-semibold text-blue-900">
                      ${w.amount}
                    </td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        w.status === "approved"
                          ? "text-green-600"
                          : w.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {w.status}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {new Date(w.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-3 py-2">
                      {w.status === "pending" ? (
                        <button
                          onClick={() => approveWithdrawal(w._id)}
                          disabled={loading}
                          className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm text-sm"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-blue-900">✔ Done</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
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
    </AdminDashboardLayout>
  );
};

export default WithdrawalTable;
