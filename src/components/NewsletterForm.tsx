const NewsletterForm = () => {
  return (
    <form className="flex-1 flex flex-col items-start w-full gap-y-6 lg:flex-row lg:gap-x-10">
      <input
        className="w-full lg:w-auto px-4 py-3 rounded-lg bg-transparent border border-white text-base text-white placeholder:text-white placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Enter your email"
      />
      <button className="btn bg-white text-blue-950 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-white/80 transition">
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;
