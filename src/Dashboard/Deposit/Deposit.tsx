// src/components/DepositForm.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { GetAllDepositApi, WalletListApi } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";

interface AdminWallet {
  _id: string;
  walletName: string;
  walletAdress: string;
  walletQR?: string;
}

interface DepositPayload {
  adminWalletId: string;
  amount: number;
  clientId: string;
  havePaid: boolean;
}

const DepositForm: React.FC = () => {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const clientId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await axios.get<AdminWallet[]>(WalletListApi);
        setWallets(res.data);
      } catch (error) {
        console.error("❌ Error fetching wallets:", error);
      }
    };
    fetchWallets();
  }, []);

  const handleCopy = async (wallet: AdminWallet) => {
    try {
      await navigator.clipboard.writeText(wallet.walletAdress);
      setCopied(true);
      setSelectedWallet(wallet._id); // auto-select on copy
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy: ", err);
    }
  };

  const handleDeposit = async (havePaid: boolean) => {
    const numericAmount = Number(amount);

    if (!selectedWallet || numericAmount <= 0 || isNaN(numericAmount)) {
      setMessage("⚠️ Please select a wallet and enter a valid amount.");
      return;
    }
    if (!clientId) {
      setMessage("⚠️ User ID missing. Please log in again.");
      return;
    }

    const payload: DepositPayload = {
      adminWalletId: selectedWallet,
      amount: numericAmount,
      clientId,
      havePaid,
    };

    try {
      setLoading(true);
      console.log("📤 Sending payload:", payload);

      // ⛔ Replace GetAllDepositApi with the real POST endpoint
      const res = await axios.post(`${GetAllDepositApi}`, payload);

      console.log("✅ Deposit response:", res.data);

      setMessage(
        `Deposit ${
          havePaid ? "submitted with payment" : "saved for later"
        } successfully.`
      );
      navigate("/dashboard");
    } catch (error: any) {
      console.error("❌ Error creating deposit:", error.response || error);
      setMessage(error.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDashboardLayout>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4">
          Steps To Deposit
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
          <li>Enter amount to deposit</li>
          <li>
            Click on a wallet below to select it, then copy the address or scan
            the QR Code
          </li>
          <li>
            After payment, click{" "}
            <span className="font-semibold">"I HAVE PAID"</span>
          </li>
        </ol>

        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-2 text-black border-blue-500 rounded-lg px-3 py-3 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter deposit amount"
          />
        </div>

        {/* Wallet selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Wallet
          </label>

          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div
                key={wallet._id}
                onClick={() => setSelectedWallet(wallet._id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition ${
                  selectedWallet === wallet._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {wallet.walletName}
                </h3>

                {/* Wallet Address + Copy */}
                <div
                  className="flex items-center gap-2 mb-2 text-blue-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(wallet);
                  }}
                >
                  <p className="truncate">
                    <span className="font-semibold">Address:</span>{" "}
                    {wallet.walletAdress}
                  </p>
                  <button className="p-1 bg-blue-100 rounded hover:bg-blue-200">
                    <Copy className="w-5 h-5 text-blue-700" />
                  </button>
                </div>

                {copied && selectedWallet === wallet._id && (
                  <p className="text-green-600 text-sm font-medium">Copied!</p>
                )}

                {wallet.walletQR && (
                  <img
                    src={wallet.walletQR}
                    alt="Wallet QR"
                    className="w-32 h-32 mt-2 border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => handleDeposit(true)}
            disabled={loading}
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md font-semibold transition"
          >
            I HAVE PAID
          </button>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
            disabled={loading}
            className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl shadow-md font-semibold transition"
          >
            PAY LATER
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default DepositForm;
