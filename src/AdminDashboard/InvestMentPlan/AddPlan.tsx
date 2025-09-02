import React, { useState } from "react";
import axios from "axios";
import { AddInvestmentPlanApi } from "../../Api/Api"; // <-- define this in your Api.ts
import AdminDashboardLayout from "../Dashboard/AdminDashboard";

const AdminAddPlanForm: React.FC = () => {
  //   const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        AddInvestmentPlanApi,
        {
          planName,
          minAmount,
          maxAmount,
          duration,
          interestRate,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ Investment plan created successfully!");
      setPlanName("");
      setMinAmount("");
      setMaxAmount("");
      setDuration("");
      setInterestRate("");
      //   navigate("/view/plan");
      console.log("Response:", res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Add Investment Plan
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Plan Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Plan Name
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                placeholder="Enter plan name"
                required
              />
            </div>

            {/* Inputs in grid (responsive spacing) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Min Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Min Amount
                </label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                  placeholder="100"
                  required
                />
              </div>

              {/* Max Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Amount
                </label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                  placeholder="10000"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                  placeholder="30"
                  required
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-1 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-darkblue focus:border-darkblue text-base px-3 py-3"
                  placeholder="5"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkblue transition"
              >
                {loading ? "Saving..." : "Save Plan"}
              </button>
            </div>
          </form>

          {/* Status Message */}
          {message && (
            <div
              className={`mt-6 p-3 rounded-lg text-sm font-medium text-center ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAddPlanForm;
