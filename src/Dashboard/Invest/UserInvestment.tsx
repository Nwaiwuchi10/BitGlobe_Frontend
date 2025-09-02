// src/components/UserInvestPlan.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { InvestmentPlanApi, UserInvestPlanApi } from "../../Api/Api";

interface InvestmentPlan {
  _id: string;
  planName: string;
  minAmount: number;
  maxAmount: number;
  duration: number;
  interestRate: number;
}

const UserInvestPlan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<InvestmentPlan | null>(null);
  const [amount, setAmount] = useState<string>("");
  // useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get<InvestmentPlan>(
          `${InvestmentPlanApi}/${id}`
        );
        setPlan(res.data);
      } catch (err) {
        setMessage("Failed to load plan details.");
      }
    };
    fetchPlan();
  }, [id]);

  const handleInvest = async () => {
    if (!plan) return;
    try {
      setLoading(true);
      const clientId = localStorage.getItem("userId"); // Replace with actual logged-in user id
      const res = await axios.post(`${UserInvestPlanApi}/${plan._id}`, {
        clientId,
        investmentplanId: plan._id,
        amount: Number(amount),
      });
      setMessage(res.data.message || "Investment successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Investment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Ready to get started?
        </h1>

        {plan ? (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900">{plan.planName}</h2>
            <p className="text-sm text-blue-900 mt-2">
              Min: <span className="font-semibold">${plan.minAmount}</span> |
              Max: <span className="font-semibold">${plan.maxAmount}</span>
            </p>
            <p className="text-sm text-blue-900 mt-2">
              Duration:{" "}
              <span className="font-semibold">{plan.duration} days</span>
            </p>
            <p className="text-sm text-blue-900 mt-2">
              <span className="font-bold"> Note:</span>
              <span className="font-semibold">
                Minimum invest ${plan.minAmount} USD and upto ${plan.maxAmount}{" "}
                USD
              </span>
            </p>

            {/* Amount Input */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Enter Investment Amount
              </label>
              <input
                type="number"
                value={amount}
                // onChange={(e) => setAmount(Number(e.target.value))}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <button
              onClick={handleInvest}
              style={{ cursor: "pointer" }}
              disabled={loading}
              className="mt-4 w-full bg-blue-900 text-white py-2 rounded-xl font-semibold transition hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Invest Now"}
            </button>
          </div>
        ) : (
          <p className="text-center text-blue-900">Loading plan...</p>
        )}

        {message && (
          <p className="text-center mt-4 font-semibold text-blue-900">
            {message}
          </p>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default UserInvestPlan;
