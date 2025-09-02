import { useEffect } from "react";

const Support = () => {
  useEffect(() => {
    (window as any).Tawk_API = (window as any).Tawk_API || {};
  }, []);

  const openChat = () => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.maximize();
    }
  };

  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      💬 Chat
    </button>
  );
};

export default Support;
