import NewsletterForm from "./NewsletterForm";

// import components
// import NewsletterForm from './NewsletterForm';

const Newsletter = () => {
  return (
    <section className="py-[40px] lg:py-[88px] bg-newsletter bg-cover">
      <div className="container mx-auto">
        <div
          className="flex flex-col lg:flex-row items-center justify-between bg-blue p-12 rounded-2xl lg:bg-newsletterBox lg:bg-no-repeat lg:h-[216px]"
          data-aos="fade-up"
          data-aos-offset="400"
        >
          {/* text */}
          <div className="flex-1 w-full">
            <h2 className="h3 mb-4">Start mining now</h2>
            <h3 className="max-w-[348px] mb-4">
              Join now with Elite Globe to get the latest news and start mining
              now
            </h3>

            <h3 className="max-w-[348px] mb-4">
              Office address:{" "}
              <span>252 HICKORY AVE TENAFLY NJ 07670-1435 USA</span>
            </h3>
            <h3 className="max-w-[348px] mb-4">
              Anything else? just call us: <span>+1 618 227 4072</span>
            </h3>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
