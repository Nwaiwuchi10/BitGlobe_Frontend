import { Link } from "react-router-dom";

const AccountBtns = () => {
  return (
    <div className="flex items-center font-medium">
      {/* link btn */}
      <a className="hover:text-blue transition" href="#">
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>{" "}
      </a>
      {/* separator */}
      <span className="mx-6 text-white/20 font-thin">|</span>
      {/* register btn */}
      <button className="btn h-[52px] text-base px-8">
        <Link to="/register" style={{ textDecoration: "none" }}>
          Register
        </Link>{" "}
      </button>
    </div>
  );
};

export default AccountBtns;
