// src/components/ReferralAccount.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { UsersApi } from "../../Api/Api";

interface ReferralAccount {
  referralCode: string;
  referralBalance: number;
  totalReferrals: number;
  referrals: { name: string; email: string; country: string }[];
}

const ReferralAccountScreen: React.FC = () => {
  const [account, setAccount] = useState<ReferralAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  // Replace USER_ID with logged-in user id
  //   const apiUrl = "http://localhost:5000/referral-account/USER_ID";

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${UsersApi}/${userId}`);
        setAccount(res.data);
      } catch (err: any) {
        setError("Failed to load referral account.");
      } finally {
        setLoading(false);
      }
    };
    fetchReferral();
  }, []);

  return (
    <UserDashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Welcome!</h1>
          <p className="text-blue-900 text-lg">Referral Account</p>
          <p className="text-blue-900">
            Earn rewards by inviting your friends to join us!
          </p>
        </div>

        {loading && <p className="text-center text-blue-900">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Referral Balance */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Referral Balance
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                ${account?.referralBalance}
              </p>
              <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-500">
                Withdraw Referral Funds
              </button>
            </div>

            {/* Referral Code */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Your Referral Code
              </h2>
              <p className="text-xl font-bold text-blue-900 mt-4">
                {account?.referralCode}
              </p>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(account?.referralCode)
                }
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Copy Code
              </button>
            </div>

            {/* Total Referrals */}
            {/* <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-blue-900">
                Total Referrals
              </h2>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                {account.totalReferrals}
              </p>
            </div> */}

            {/* Referral History */}
            {/* <div className="bg-white shadow-md rounded-2xl p-6 col-span-full">
              <h2 className="text-lg font-semibold text-blue-900">
                Referral History
              </h2>
              {account.referrals.length === 0 ? (
                <p className="text-sm text-blue-900 mt-4">
                  You have not referred anyone yet.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {account.referrals.map((ref, index) => (
                    <li
                      key={index}
                      className="p-3 bg-blue-50 rounded-xl flex justify-between"
                    >
                      <span>{ref.name}</span>
                      <span className="text-sm">{ref.email}</span>
                      <span className="text-sm text-blue-700">
                        {ref.country}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </div>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default ReferralAccountScreen;
