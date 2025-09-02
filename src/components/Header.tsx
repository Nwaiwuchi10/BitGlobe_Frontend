// import components
import Logo from "../assets/img/bitcoin.png";
import Nav from "./Nav";
import AccountBtns from "./AccountBtns";

// import icons
import { CgMenuRight } from "react-icons/cg";
interface HeaderProps {
  setNavMobile: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({ setNavMobile }) => {
  return (
    <header
      className="py-[30px] lg:pt-[60px]"
      data-aos="fade-down"
      data-aos-delay="900"
      data-aos-duration="2000"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <a href="#">
          <span className="flex justify-evenly items-center gap-6">
            <img src={Logo} alt="" />{" "}
            <span className="text-2xl font-extrabold"> Bit Globe</span>
          </span>
        </a>
        {/* nav & btns */}
        <div className="hidden lg:flex gap-x-[55px]">
          <Nav />
          <AccountBtns />
        </div>
        {/* open nav btn */}
        <div
          onClick={() => setNavMobile(true)}
          className="lg:hidden cursor-pointer"
        >
          <CgMenuRight className="text-2xl mr-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
