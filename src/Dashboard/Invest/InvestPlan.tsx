// src/components/InvestmentPlans.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { InvestmentPlanApi } from "../../Api/Api";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

interface InvestmentPlan {
  _id: string;
  planName: string;
  minAmount: number;
  maxAmount: number;
  duration: number;
  interestRate: number;
  createdAt?: string;
}

const InvestmentPlansDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your real endpoint
  //   const apiUrl = "http://localhost:5000/investment-plans";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await axios.get<InvestmentPlan[]>(InvestmentPlanApi);
        setPlans(res.data);
      } catch (err: any) {
        setError("Failed to load investment plans.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <UserDashboardLayout>
      <div className="p-6">
        {/* Header content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900  mb-2">
            Choose an Option
          </h1>
          <p className="text-blue-900">Investment Plan</p>
          <p className="text-blue-900">
            Choose your investment plan and start earning.
          </p>
        </div>

        {loading && (
          <p className="text-center text-blue-900 mt-4">Loading plans...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="text-blue-900">
                <h2 className="text-lg font-bold text-blue-900 mt-4 mb-2">
                  {plan.planName}
                </h2>
                <p className="text-sm text-blue-900 mt-4">
                  Min Amount:{" "}
                  <span className="font-semibold">${plan.minAmount}</span>
                </p>
                <p className="text-sm text-blue-900 mt-4">
                  Max Amount:{" "}
                  <span className="font-semibold text-blue-900 mt-4">
                    ${plan.maxAmount}
                  </span>
                </p>
                <p className="text-sm text-blue-900 mt-4">
                  Duration:{" "}
                  <span className="font-semibold">{plan.duration} days</span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/invest/${plan._id}`)}
                style={{ cursor: "pointer" }}
                className="mt-4 w-full bg-blue-900 text-white py-2 rounded-xl font-semibold transition"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default InvestmentPlansDisplay;
