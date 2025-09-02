import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { Base_url } from "../../Api/BaseUrl";

interface AdminWallet {
  _id: string;
  walletName: string;
  walletAdress: string;
}

interface Deposit {
  _id: string;
  adminWalletId: AdminWallet;
  amount: number;
  havePaid: boolean;
  approvePayment: boolean;
  depositStatus: string;
  createdAt: string;
}

const UserDepositTableHistory: React.FC<{}> = () => {
  const userId = localStorage.getItem("userId");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Deposit[]>(
        `${Base_url}/deposit/user/${userId}/all`
      );
      setDeposits(res.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDeposits();
    }
  }, [userId]);

  return (
    <UserDashboardLayout>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4">
          Deposit History
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="border px-3 py-2">Wallet</th>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Paid</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length > 0 ? (
                deposits.map((d) => (
                  <tr
                    key={d._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="border px-3 py-2 text-blue-900">
                      {d.adminWalletId?.walletName || "N/A"}
                    </td>
                    <td className="border px-3 py-2 font-semibold text-blue-900">
                      ${d.amount}
                    </td>
                    <td className="border px-3 py-2">
                      {d.havePaid ? "✅ Yes" : "❌ No"}
                    </td>
                    <td
                      className={`border px-3 py-2 font-medium ${
                        d.depositStatus === "Approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {d.depositStatus}
                    </td>
                    <td className="border px-3 py-2 text-blue-900">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
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
    </UserDashboardLayout>
  );
};

export default UserDepositTableHistory;
