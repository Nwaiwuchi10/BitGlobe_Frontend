import { useState } from "react";

// import aos
// import Aos from 'aos';
// import 'aos/dist/aos.css';
import Hero from "../../components/Hero";
import Header from "../../components/Header";
import NavMobile from "../../components/NavMobile";
import Stats from "../../components/Stats";
import Why from "../../components/Why";

import Trade from "../../components/Trade";
import Features from "../../components/Features";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import TradingTicker from "../../components/TradingTicker";

// import components

const Homepage = () => {
  const [navMobile, setNavMobile] = useState(false);
  // aos init
  //   useEffect(() => {
  //     Aos.init({
  //       duration: 2500,
  //       delay: 400,
  //     });
  //   });
  return (
    <>
      <div className="overflow-hidden">
        <Header setNavMobile={setNavMobile} />
        <Hero />
        {/* mobile nav */}
        <div
          className={`${
            navMobile ? "right-0" : "-right-full"
          } fixed z-10 top-0 h-full transition-all duration-200`}
        >
          <NavMobile setNavMobile={setNavMobile} />
        </div>
        <Stats />
        <Why />
        <TradingTicker />
        {/* <Calculate /> */}
        <Trade />
        <Features />
        <Newsletter />
        <Footer />
        {/* <TradingViewChart /> */}
      </div>
    </>
  );
};

export default Homepage;
