import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../Api/BaseUrl";
import AdminDashboardLayout from "../Dashboard/AdminDashboard";
interface AdminWallet {
  _id: string;
  walletName: string;
  walletAdress: string;
}
interface Withdrawal {
  amount: number;
  country: string;
  state: string;
  accNumber: string;
  bank: string;
  status: string;
  createdAt: string;
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
const Manuplate = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id || "Unknown User";
  console.log("Managing User ID:", userId);

  // separate states for each input
  const [referralBalance, setReferralBalance] = useState<string>("");
  const [referralCount, setReferralCount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [reduceAmount, setReduceAmount] = useState<string>("");
  const [earnedBalance, setEarnedBalance] = useState<string>("");

  const callApi = async (url: string, body?: any) => {
    try {
      const res = await axios.patch(`${Base_url}${url}`, body);
      alert("Success!");
      return res.data;
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };
  //   const userId = localStorage.getItem("userId");
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

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ totalAmount: number; deposits: Deposit[] }>(
        `${Base_url}/deposit/user/${userId}/all`
      );

      setDeposits(res.data.deposits); // ✅ fix
      console.log("Total amount:", res.data.totalAmount); // you can display this somewhere
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
    <AdminDashboardLayout>
      <div className="p-8 space-y-8 bg-white text-black min-h-screen">
        <h1 className="text-3xl font-bold border-b pb-4">
          Manage User
          {/* <span className="text-blue-600">{userId}</span> */}
        </h1>

        {/* Block User Section */}
        <section className="p-6 border rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Access</h2>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => callApi(`/users/${userId}/block/user`)}
          >
            Block User Login
          </button>
        </section>

        {/* Referral Section */}
        <section className="p-6 border rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Referral Management</h2>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={referralBalance}
              onChange={(e) => setReferralBalance(e.target.value)}
              placeholder="Enter referral balance"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() =>
                callApi(`/users/${userId}/referral-balance`, {
                  amount: Number(referralBalance),
                })
              }
            >
              Update Referral Balance
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={referralCount}
              onChange={(e) => setReferralCount(e.target.value)}
              placeholder="Enter referral count"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() =>
                callApi(`/users/${userId}/referral-count`, {
                  count: Number(referralCount),
                })
              }
            >
              Update Referral Count
            </button>
          </div>
        </section>

        {/* Investment Section */}
        <section className="p-6 border rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Investment Management</h2>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => callApi(`/usersinvestmentplan/${userId}/pause`)}
            >
              Pause Investment
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              onClick={() => callApi(`/usersinvestmentplan/${userId}/end`)}
            >
              End Investment
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter new interest rate %"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() =>
                callApi(`/usersinvestmentplan/${userId}/percent`, {
                  interestRate: Number(interestRate),
                })
              }
            >
              Update Investment Interest
            </button>
          </div>
        </section>

        {/* Trading Account Section */}
        <section className="p-6 border rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Trading Account</h2>

          {/* <div className="flex items-center gap-2">
            <input
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number(e.target.value))}
              placeholder="Credit amount"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() =>
                callApi(`/tradingaccount/${userId}/credit`, {
                  amount: creditAmount,
                })
              }
            >
              Credit Trading Account
            </button>
          </div> */}

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={earnedBalance}
              onChange={(e) => setEarnedBalance(e.target.value)}
              placeholder="Earned balance"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() =>
                callApi(`/tradingaccount/${userId}/earned-fund`, {
                  amount: Number(earnedBalance),
                  add: true,
                })
              }
            >
              Add to Earned Fund
            </button>
            {/* Reduce Earned Fund */}

            {/* <button
              className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-900"
              onClick={() =>
                callApi(`/tradingaccount/${userId}/earned-fund`, {
                  amount: earnedBalance,
                  add: false,
                })
              }
            >
              Set Earned Fund
            </button> */}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              value={reduceAmount}
              onChange={(e) => setReduceAmount(e.target.value)}
              placeholder="Amount to reduce"
              className="border p-2 rounded w-48 text-black"
            />
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() =>
                callApi(`/tradingaccount/${userId}/reduce-earnedfund`, {
                  amount: Number(reduceAmount),
                })
              }
            >
              Reduce Earned Fund
            </button>
          </div>
        </section>
        <section>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-darkblue mb-4">
              User Deposit History
            </h2>

            {loading && <p className="text-center text-gray-500">Loading...</p>}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    {/* <th className="border px-3 py-2">Wallet</th> */}
                    <th className="border px-3 py-2">Amount</th>
                    <th className="border px-3 py-2">Paid</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.length > 0 ? (
                    deposits?.map((d: any) => (
                      <tr
                        key={d._id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        {/* <td className="border px-3 py-2 text-blue-900">
                          {d?.adminWalletId?.walletName || "N/A"}
                        </td> */}
                        <td className="border px-3 py-2 font-semibold text-blue-900">
                          ${d?.amount}
                        </td>
                        <td className="border px-3 py-2">
                          {d.havePaid ? "✅ Yes" : "❌ No"}
                        </td>
                        <td
                          className={`border px-3 py-2 font-medium ${
                            d?.depositStatus === "Approved"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {d?.depositStatus}
                        </td>
                        <td className="border px-3 py-2 text-blue-900">
                          {new Date(d?.createdAt).toLocaleString()}
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
        </section>
        {/* Withdrawal History Section */}
        <section>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-darkblue mb-4">
              User Withdrawals History
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
                        <td className="border px-3 py-2 text-blue-900">
                          {w.bank}
                        </td>
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
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default Manuplate;
