// import data

// import icons
import { CgClose } from "react-icons/cg";
import { navData } from "../data";
import { Link } from "react-router-dom";
interface HeaderProps {
  setNavMobile: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavMobile: React.FC<HeaderProps> = ({ setNavMobile }) => {
  return (
    <nav className="bg-blue-900 h-full top-0 bottom-0 w-80 flex justify-center items-center">
      {/* close btn */}
      <div
        onClick={() => setNavMobile(false)}
        className="absolute top-2 left-2 cursor-pointer"
      >
        <CgClose className="text-3xl" />
      </div>
      {/* menu list */}
      <ul className="text-xl flex flex-col gap-y-8">
        {navData.map((item: any, index: any) => {
          return (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
            </li>
          );
        })}
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
