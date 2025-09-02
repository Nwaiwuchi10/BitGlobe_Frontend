import React, { useState } from "react";
import axios from "axios";
import { TradingAccountApi } from "../../Api/Api";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

// interface WithdrawalFormProps {
//   clientId: string; // pass from parent (logged-in user)
// }

const WithdrawalForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    country: "",
    state: "",
    bank: "",
    accNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clientId = localStorage.getItem("userId");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${TradingAccountApi}/${clientId}/withdraw`,
        formData
      );
      setMessage(response.data.message);
      setFormData({
        amount: "",
        country: "",
        state: "",
        bank: "",
        accNumber: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDashboardLayout>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
        <h2 className="text-xl font-bold text-darkblue mb-4 text-blue-900">
          Request Withdrawal
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.includes("success") || message.includes("submitted")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-blue-900 mb-1"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-blue-900"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-blue-900 mb-1"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-blue-900"
              required
            />
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-blue-900 mb-1"
            >
              State
            </label>
            <input
              id="state"
              type="text"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-blue-900"
              required
            />
          </div>

          {/* Bank */}
          <div>
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-blue-900 mb-1"
            >
              Bank Name
            </label>
            <input
              id="bank"
              type="text"
              name="bank"
              placeholder="Enter bank name"
              value={formData.bank}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-blue-900"
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label
              htmlFor="accNumber"
              className="block text-sm font-medium text-blue-900 mb-1"
            >
              Account Number
            </label>
            <input
              id="accNumber"
              type="text"
              name="accNumber"
              placeholder="Enter account number"
              value={formData.accNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-blue-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ cursor: "pointer" }}
            className="w-full bg-blue-900 text-white py-2 rounded-lg shadow-md hover:bg-blue-800 transition font-semibold"
          >
            {loading ? "Processing..." : "Submit Withdrawal"}
          </button>
        </form>
      </div>
    </UserDashboardLayout>
  );
};

export default WithdrawalForm;
