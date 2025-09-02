// import images

import TradingViewChart from "./TradingViewChart";

const Why = () => {
  return (
    <section className="section">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-x-8 mt-16 lg:flex-row">
          {/* image */}
          <div
            className="order-2 w-full md:w-1/2 p-4 lg:order-1"
            data-aos="fade-right"
            data-aos-offset="400"
          >
            <TradingViewChart />
            {/* <img src={Image} alt="" /> */}
          </div>
          {/* text */}
          <div
            className="order-1 lg:order-2 max-w-[480px]"
            data-aos="fade-left"
            data-aos-offset="400"
          >
            <h2 className="section-title">Why you should choose Elite Globe</h2>
            <p className="section-subtitle">
              Experience the next generation Bitcoin platform. No financial
              borders, extra fees, and fake reviews.
            </p>
            <button className="flex mt-6 items-center gap-x-2 px-6 py-3 bg-blue-950 text-white rounded-xl shadow-md hover:bg-blue-700 transition lg:h-16 lg:text-base btn px-6">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
