import React, { useEffect, useState } from "react";
import axios from "axios";
import { WalletListApi, DeleteWalletApi } from "../../Api/Api"; // update with your endpoints
import AdminDashboardLayout from "../Dashboard/AdminDashboard";

interface AdminWallet {
  _id: string;
  walletName: string;
  walletAdress: string;
  walletQR?: string;
  createdAt: string;
}

const AdminWalletTable: React.FC = () => {
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch wallets
  const fetchWallets = async () => {
    setLoading(true);
    try {
      const res = await axios.get<AdminWallet[]>(WalletListApi);
      setWallets(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to load wallets");
    } finally {
      setLoading(false);
    }
  };

  // Delete wallet
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wallet?")) return;
    try {
      await axios.delete(`${DeleteWalletApi}/${id}`);
      setWallets(wallets.filter((w) => w._id !== id));
      setMessage("✅ Wallet deleted successfully!");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to delete wallet");
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6">
          Admin Wallets
        </h2>

        {/* Status message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-darkblue text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Wallet Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  QR Code
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Created At
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    Loading wallets...
                  </td>
                </tr>
              ) : wallets.length > 0 ? (
                wallets.map((wallet) => (
                  <tr key={wallet._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {wallet.walletName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {wallet.walletAdress}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {wallet.walletQR ? (
                        <img
                          src={wallet.walletQR}
                          alt="QR"
                          className="h-10 w-10 rounded-md border"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(wallet.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(wallet._id)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No wallets found
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

export default AdminWalletTable;
