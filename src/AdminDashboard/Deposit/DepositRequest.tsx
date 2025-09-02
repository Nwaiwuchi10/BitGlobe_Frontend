// src/components/DepositTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../Dashboard/AdminDashboard";
import { GetAllDepositApi } from "../../Api/Api";

interface AdminWallet {
  _id: string;
  walletName: string;
  walletAdress: string;
}

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Deposit {
  _id: string;
  adminWalletId: AdminWallet;
  clientId: Client;
  amount: number;
  havePaid: boolean;
  approvePayment: boolean;
  depositStatus: string;
  createdAt: string;
}

const DepositTable: React.FC = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Fetch deposits
  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Deposit[]>(GetAllDepositApi);
      setDeposits(res.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  // Approve deposit
  const approveDeposit = async (id: string) => {
    try {
      setLoadingId(id); // only this row is loading
      const res = await axios.patch(`${GetAllDepositApi}/${id}/approve`);
      setMessage(res.data.message);
      await fetchDeposits();
    } catch (error: any) {
      console.error("Error approving deposit:", error);
      setMessage(error.response?.data?.message || "Approval failed");
    } finally {
      setLoadingId(null); // reset after completion
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4">
          Deposits Management
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">{message}</p>
        )}

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200  text-sm">
            <thead className="bg-blue-900">
              <tr>
                <th className="border px-3 py-2 text-left">Client</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Wallet</th>
                <th className="border px-3 py-2 text-left">Amount</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Paid</th>
                <th className="border px-3 py-2 text-left">Created</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length > 0 ? (
                deposits.map((deposit) => (
                  <tr
                    key={deposit._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="border px-3 py-2 text-blue-900">
                      {deposit.clientId?.firstName} {deposit.clientId?.lastName}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {deposit.clientId?.email}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {deposit.adminWalletId?.walletName}
                    </td>
                    <td className="border px-3 py-2 font-semibold text-blue-900">
                      ${deposit.amount}
                    </td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        deposit.depositStatus === "Approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {deposit.depositStatus}
                    </td>
                    <td className="border px-3 py-2">
                      {deposit.havePaid ? "✅ Yes" : "❌ No"}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {new Date(deposit.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-3 py-2">
                      {!deposit.approvePayment ? (
                        <button
                          onClick={() => approveDeposit(deposit._id)}
                          disabled={loadingId === deposit._id} // only disable this row's button
                          className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm text-sm"
                        >
                          {loadingId === deposit._id
                            ? "Approving..."
                            : "Approve"}
                        </button>
                      ) : (
                        <span className="text-blue-900">Already Approved</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-4 border"
                  >
                    No deposits found
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

export default DepositTable;
