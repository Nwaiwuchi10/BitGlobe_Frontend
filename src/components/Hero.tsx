// import images
import Image from "../assets/img/hero-img.png";

// import icons
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col items-center lg:flex-row">
          {/* hero text */}
          <div className="flex-1">
            {/* badge text */}
            <div
              className="bg-white/10 p-1 mb-6 rounded-full pl-1 pr-3 max-w-[365px]"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div className="flex items-center justify-between text-sm lg:text-base">
                <div className="bg-white text-darkblue rounded-full font-medium py-1 px-4 text-blue-900">
                  100% SAVE
                </div>
                <div>Tested & Trusted</div>
              </div>
            </div>
            {/* title */}
            <h1
              className="text-[32px] lg:text-[64px] font-bold leading-tight mb-6"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              Fastest & secure platform to invest in Bitcoin.
            </h1>
            <p
              className="max-w-[440px] leading-relaxed mb-8"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Buy and sell cryptocurrencies, trusted by 10M wallets with over
              $30 billion in transactions.
            </p>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
              className="flex items-center gap-x-2 px-6 py-3 bg-blue-950 text-white rounded-xl shadow-md hover:bg-blue-700 transition lg:h-16 lg:text-base"
              data-aos="fade-down"
              data-aos-delay="700"
            >
              Try for free
              <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl" />
            </button>
          </div>
          {/* hero image */}
          <div className="flex-1">
            <img src={Image} alt="" data-aos="fade-up" data-aos-delay="600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
