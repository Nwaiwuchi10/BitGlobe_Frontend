// src/components/TradingAccount.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { TradingAccountApi } from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";

interface TradingAccount {
  availableBalance: number;
  totalWithdrawal: number;
  earnedFund: number;
  totalDeposits: number;
  cumulative: number;
}
interface TransactSum {
  totalWithdrawals: number;
  totalDeposits: number;
}

const TradingAccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<TradingAccount | null>(null);
  const [transactionSum, setTransaction] = useState<TransactSum | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  // Replace with your real endpoint
  //   const apiUrl = "http://localhost:5000/trading-account/getAccount/USER_ID";

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${TradingAccountApi}/${userId}`);
        setAccount(res.data);
      } catch (err: any) {
        setError("Failed to load trading account.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${TradingAccountApi}/summary/${userId}`);
        setTransaction(res.data);
      } catch (err: any) {
        setError("Failed to load trading account.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  return (
    <UserDashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Welcome!</h1>
          <p className="text-blue-900 text-lg">Trading Account</p>
          <p className="text-blue-900">
            A glance summary of your Trading account. Have a nice day!
          </p>
        </div>

        {loading && (
          <p className="text-center text-blue-900">Loading account...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Cards Grid */}
        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Available Balance */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Available Balance
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${account.availableBalance}
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard/deposit")}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-700"
                >
                  Deposit Funds
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard/withdrawal")}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-500"
                >
                  Withdraw Funds
                </button>
              </div>
            </div>

            {/* Total Withdrawal */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Total Withdrawal
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${transactionSum?.totalWithdrawals || 0}
              </p>
            </div>

            {/* Earned Funds */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Earned Funds
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${account?.earnedFund}
              </p>
            </div>

            {/* Total Deposits */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Total Deposits
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${transactionSum?.totalDeposits || 0}
              </p>
            </div>

            {/* Cumulative */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Cumulative
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${transactionSum?.totalDeposits || 0}
              </p>
            </div>

            {/* Deposit History */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-blue-900">
                Deposit History
              </h2>
              <p className="text-sm text-blue-900 mt-4">
                Click button below to view deposit transaction history...
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-700">
                <Link to="/dashboard/deposit-history"> Deposit History</Link>
              </button>
            </div>

            {/* Withdrawal History */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-blue-900">
                Withdrawal History
              </h2>
              <p className="text-sm text-blue-900 mt-4">
                Click button below to view withdrawal transaction history...
              </p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-500">
                <Link to="/dashboard/withdrawal-history">
                  {" "}
                  Withdrawal History
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default TradingAccountScreen;
