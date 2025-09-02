import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDashboardLayout from "../UserDashboard/DashboardLayout";
import { Base_url } from "../../Api/BaseUrl";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode: string;
  referredBy?: string;
}

const ViewProfile: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get<User>(`${Base_url}/users/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <UserDashboardLayout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-darkblue mb-4 text-center">
          My Profile
        </h2>

        {user ? (
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {user.country}
            </p>
            <p>
              <span className="font-semibold">Referral Code:</span>{" "}
              {user.referralCode}
            </p>
            {user.referredBy && (
              <p>
                <span className="font-semibold">Referred By:</span>{" "}
                {user.referredBy}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default ViewProfile;
