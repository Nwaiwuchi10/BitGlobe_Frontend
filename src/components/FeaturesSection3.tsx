// import image
import video from "../assets/newww-vmake.mp4";
import video1 from "../assets/manTest.mp4";
import Image3 from "../assets/img/feature-3-img.png";

const FeaturesSection3 = () => {
  return (
    <section className="py-[30px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row">
        {/* text */}
        <div
          className="max-w-[454px] mb-6 lg:mt-10"
          data-aos="fade-right"
          data-aos-offset="400"
        >
          <h3 className="h3 mb-6">
            Grow your profit and track your investments
          </h3>
          <p className="text-gray mb-8 max-w-[408px]">
            Use advanced analytical tools. Clear TradingView charts let you
            track current and historical profit investments.
          </p>
          <button className='  className="flex items-center gap-x-2 px-6 py-3 bg-blue-950 text-white rounded-xl shadow-md hover:bg-blue-700 transition lg:h-16 lg:text-base" btn px-8'>
            Learn more
          </button>
        </div>
        {/* image */}
        <div
          className="flex-1 flex justify-end"
          data-aos="fade-left"
          data-aos-offset="450"
        >
          <img src={Image3} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <video
          controls
          muted
          className="w-full h-84 mt-32 max-w-3xl rounded-xl border-4 border-blue-950 shadow-lg"
        >
          <source src={video} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex justify-center items-center w-full">
        <video
          controls
          muted
          className="w-full h-84 mt-32 max-w-3xl rounded-xl border-4 border-blue-950 shadow-lg"
        >
          <source src={video1} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* <div>
        <video controls muted>
          <source src={video} />
        </video>
      </div> */}
    </section>
  );
};

export default FeaturesSection3;
