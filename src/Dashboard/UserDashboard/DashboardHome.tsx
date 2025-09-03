import UserDashboardLayout from "./DashboardLayout";
import TradingViewChart from "../../components/TradingViewChart";
import TradingTicker from "../../components/TradingTicker";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GetAllDepositApi,
  TradingAccountApi,
  UserInvestPlanApi,
} from "../../Api/Api";
interface TradingAccount {
  availableBalance: number;
  totalWithdrawal: number;
  earnedFund: number;
  totalDeposits: number;
  cumulative: number;
}
interface TransactSum {
  totalDeposits: number;
  totalWithdrawals: number;
}
interface DepoSum {
  totalDeposits: number;
}
interface InvestmentPlan {
  _id: string;
  planName: string;
  duration: number;
  minAmount: number;
  maxAmount: number;
  interestRate?: number;
}

interface UserInvestment {
  _id: string;
  amount: number;
  isPaused: boolean;
  isEnded: boolean;
  startDate: string;
  endDate: string;
  investmentplanId: InvestmentPlan;
}
const DashboardHome = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<TradingAccount | null>(null);
  const [transactionSum, setTransaction] = useState<TransactSum | null>(null);
  const [depositSum, setDeposiSum] = useState<DepoSum | null>(null);

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
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GetAllDepositApi}/total/${userId}`);
        setDeposiSum(res.data);
      } catch (err: any) {
        setError("Failed to load trading account.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);
  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const res = await axios.get<UserInvestment[]>(
        `${UserInvestPlanApi}/user-investments/${userId}`
      );
      setInvestments(res.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchInvestments();
    }
  }, [userId]);
  return (
    <UserDashboardLayout>
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Welcome & Summary Section */}
        <div className="flex-1 space-y-3">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900">Welcome!</h1>
            <p className="text-blue-900 text-lg">Trading Account</p>
            <p className="text-blue-900">
              A glance summary of your Trading account. Have a nice day!
            </p>
          </div>
          {/* <h1 className="text-3xl font-bold text-darkblue">Welcome!</h1> */}
          <h2 className="text-xl text-gray-700">New user</h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            At a glance summary of your investment. Have a nice day!
          </p>
          <button
            onClick={() => navigate("/dashboard/invest")}
            className="px-6 py-2 bg-darkblue text-blue-900 rounded-2xl shadow-md 
             hover:bg-red-600 hover:shadow-lg transition duration-300 font-semibold"
          >
            Invest Now
          </button>
          {/* trading section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-gray-500">Loading investments...</p>
            ) : investments.length > 0 ? (
              investments.map((inv) => (
                <div
                  key={inv._id}
                  className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-bold text-blue-900">
                    {inv.investmentplanId?.planName || "Unnamed Plan"}
                  </h2>
                  <p className="text-gray-600">
                    Duration:{" "}
                    <span className="font-medium">
                      {inv.investmentplanId?.duration} days
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Amount Invested:{" "}
                    <span className="font-semibold text-green-700">
                      ${inv.amount}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Start Date: {new Date(inv.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    End Date: {new Date(inv.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No investments found.</p>
            )}
          </div>
        </div>

        {/* Trading View Chart */}
        <div className="w-full md:w-1/2 p-4">
          <TradingViewChart />
        </div>
      </div>
      <div>
        <div className="p-6">
          {/* Header */}

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
                  ${depositSum?.totalDeposits || 0}
                </p>
              </div>

              {/* Cumulative */}
              <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-blue-900">
                  Cumulative
                </h2>
                <p className="text-2xl font-bold text-blue-900 mt-4">
                  ${account?.earnedFund}
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
      </div>
      <TradingTicker />
    </UserDashboardLayout>
  );
};

export default DashboardHome;
