import React, { useEffect, useState } from "react";
import axios from "axios";
import { InvestmentPlanApi } from "../../Api/Api"; // <-- replace with your endpoint
import AdminDashboardLayout from "../Dashboard/AdminDashboard";

interface InvestmentPlan {
  _id: string;
  planName: string;
  minAmount: number;
  maxAmount: number;
  duration: number;
  interestRate: number;
  createdAt: string;
}

const InvestmentPlans: React.FC = () => {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch all plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get<InvestmentPlan[]>(InvestmentPlanApi);
      // ensure it's an array
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  // Delete a plan
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`${InvestmentPlanApi}/${id}`);
      setPlans(plans.filter((p) => p._id !== id));
      setMessage("✅ Plan deleted successfully");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to delete plan");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Investment Plans
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium text-center ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : plans.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No investment plans found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="hidden md:table w-full border-collapse text-left bg-white shadow-md rounded-lg">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3">Plan Name</th>
                  <th className="px-4 py-3">Min Amount</th>
                  <th className="px-4 py-3">Max Amount</th>
                  <th className="px-4 py-3">Duration (days)</th>
                  <th className="px-4 py-3">Interest Rate (%)</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan._id}
                    className="border-b bg-grey-500 text-blue-900 transition"
                  >
                    <td className="px-4 py-3">{plan.planName}</td>
                    <td className="px-4 py-3">${plan.minAmount}</td>
                    <td className="px-4 py-3">${plan.maxAmount}</td>
                    <td className="px-4 py-3">{plan.duration}</td>
                    <td className="px-4 py-3">{plan.interestRate}%</td>
                    <td className="px-4 py-3">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => alert("TODO: Edit plan")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={() => handleDelete(plan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4 text-blue-900">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="bg-white shadow-md rounded-lg p-4 border text-blue-900"
                >
                  <h2 className="text-lg font-semibold text-blue-900">
                    {plan.planName}
                  </h2>
                  <p className="text-sm text-blue-900">
                    Min: ${plan.minAmount} | Max: ${plan.maxAmount}
                  </p>
                  <p className="text-sm text-blue-900">
                    Duration: {plan.duration} days
                  </p>
                  <p className="text-sm text-gray-600 text-blue-900">
                    Interest: {plan.interestRate}%
                  </p>
                  <p className="text-xs text-blue-900">
                    Created: {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => alert("TODO: Edit plan")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={() => handleDelete(plan._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default InvestmentPlans;
