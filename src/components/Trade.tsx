import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { InvestmentPlanApi } from "../Api/Api";
import { useNavigate } from "react-router-dom";

interface InvestmentPlan {
  _id: string;
  planName: string;
  minAmount: number;
  maxAmount: number;
  duration: number;
  interestRate?: number;
}

const Trade = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get<InvestmentPlan[]>(InvestmentPlanApi);
        setPlans(res.data);
        if (res.data.length > 0) {
          setSelectedPlan(res.data[0].planName); // default selection
        }
      } catch (err) {
        console.error("Error fetching investment plans:", err);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section className="section py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto">
        <h2
          className="section-title text-center mb-16 text-3xl font-bold"
          data-aos="fade-up"
          data-aos-offset="400"
        >
          Explore our investment plans securely.
        </h2>

        {/* plans */}
        <div
          className="flex flex-col gap-[45px] lg:flex-row"
          data-aos="fade-up"
          data-aos-offset="450"
        >
          {plans.map((plan) => (
            <div
              key={plan._id}
              // onClick={() => setSelectedPlan(plan.planName)}
              className="bg-blue-950 text-white w-full rounded-2xl py-12 px-6 shadow-lg cursor-pointer transition duration-300"
            >
              <div className="flex flex-col justify-center items-center">
                {/* plan name */}
                <div className="mb-4 flex items-center gap-x-2">
                  <div className="text-[28px] font-bold">{plan.planName}</div>
                </div>

                {/* plan details */}
                <div className="mb-6 text-center text-sm space-y-2">
                  <p>
                    Min: ${plan.minAmount} – Max: ${plan.maxAmount}
                  </p>
                  <p>Duration: {plan.duration} days</p>
                  <p>Interest: {plan.interestRate ?? 0}%</p>
                  <p>24/7 Support Included</p>
                </div>
                {/* button */}
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-x-2 px-6 py-3 bg-blue-900 text-white rounded-xl shadow-md hover:bg-blue-700 transition lg:h-16 lg:text-base"
                >
                  <div className="text-lg font-medium">Invest Now</div>

                  <IoIosArrowForward
                    className={`${
                      plan.planName === selectedPlan
                        ? "text-2xl"
                        : "text-3xl text-darkblue"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trade;
