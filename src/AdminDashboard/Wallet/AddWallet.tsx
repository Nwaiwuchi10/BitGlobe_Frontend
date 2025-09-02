import React, { useState } from "react";
import axios from "axios";
import { AddWalletApi } from "../../Api/Api";
import AdminDashboardLayout from "../Dashboard/AdminDashboard";
import { useNavigate } from "react-router-dom";

const AdminAddWalletForm: React.FC = () => {
  const navigate = useNavigate();
  const [walletName, setWalletName] = useState("");
  const [walletAdress, setWalletAdress] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append(
        "walletData",
        JSON.stringify({ walletName, walletAdress })
      );
      if (file) {
        formData.append("files", file);
      }

      const res = await axios.post(AddWalletApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Wallet created successfully!");
      setWalletName("");
      setWalletAdress("");
      setFile(null);
      console.log("Response:", res.data);
      navigate("/view/wallet");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-darkblue mb-4">
            Add Admin Wallet
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Wallet Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wallet Name
              </label>
              <input
                type="text"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="mt-1 block w-full  text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                placeholder="Enter wallet name"
                required
              />
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAdress}
                onChange={(e) => setWalletAdress(e.target.value)}
                className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                placeholder="Enter wallet address"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Wallet QR (optional)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold  file:text-white file:bg-blue-900 bg-darkblue cursor-pointer rounded-lg h-12"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{ cursor: "pointer" }}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkblue transition"
            >
              {loading ? "Saving..." : "Save Wallet"}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <p className="mt-4 text-center text-sm font-medium text-gray-700">
              {message}
            </p>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAddWalletForm;
