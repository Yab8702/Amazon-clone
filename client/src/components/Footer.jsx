import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

function Footer() {
  const [{ user, logout }, dispatch] = useStateValue();

  return (
    <footer className="bg-[#232F3E]">
      <div className="bg-white py-8">
        <div className=" flex flex-col items-center border gap-2 py-8">
          <h3 className="text-sm text-gray-500">
            See personalized recommendations
          </h3>
          <Link to={!user && "/signin"}>
            <button
              className="bg-yellow-400  px-20 py-1 rounded
            "
              onClick={() => logout()}
            >
              {user ? "SignOut" : "SignIn"}
            </button>
          </Link>
          <span className="text-sm text-gray-500 flex gap-2">
            new customer?
            <a href="#" className="text-blue-500">
              start here
            </a>
          </span>
        </div>
      </div>

      <div className="w-full bg-[#334255] text-center text-white py-3 hover:bg-[#37475A] cursor-pointer">
        <a href="#header" className="w-full block">
          Back to top
        </a>
      </div>
      <div>
        <div className="w-7/12 mx-auto justify-between h-full flex   text-[#ddd] text-sm ">
          <div className="flex flex-col items-start mt-12 ">
            <div className="text-white text-lg ">Get to Know Us</div>
            <ul className="flex flex-col  gap-2 ">
              <li>
                <a href="#" className="">
                  Careers
                </a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">About Amazon</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Amazon Devices</a>
              </li>
              <li>
                <a href="#">Amazon Science</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mt-12 ">
            <div className="text-white text-lg">Make Money with Us</div>
            <ul className="flex flex-col gap-2 ">
              <li>
                <a href="#">Sell products on Amazon</a>
              </li>
              <li>
                <a href="#">Sell on Amazon Business</a>
              </li>
              <li>
                <a href="#">Sell apps on Amazon</a>
              </li>
              <li>
                <a href="#">Become an Affiliate</a>
              </li>
              <li>
                <a href="#">Advertise Your Products</a>
              </li>
              <li>
                <a href="#">Self-Publish with Us</a>
              </li>
              <li>
                <a href="#">Host an Amazon Hub</a>
              </li>
              <li className=" ">
                <span className="" aria-hidden="true">
                  ›
                </span>
                <a href="#">See More Make Money with Us</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mt-12 ">
            <div className="text-white text-lg">Amazon Payment Products</div>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">Amazon Business Card</a>
              </li>
              <li>
                <a href="#">Shop with Points</a>
              </li>
              <li>
                <a href="#">Reload Your Balance</a>
              </li>
              <li>
                <a href="#">Amazon Currency Converter</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start mt-12 ">
            <div className="text-white text-lg">Let Us Help You</div>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">Amazon and COVID-19</a>
              </li>
              <li>
                <a href="#">Your Account</a>
              </li>
              <li>
                <a href="#">Your Orders</a>
              </li>
              <li>
                <a href="#">Shipping Rates &amp; Policies</a>
              </li>
              <li>
                <a href="#">Returns &amp; Replacements</a>
              </li>
              <li>
                <a href="#">Manage Your Content and Devices</a>
              </li>
              <li>
                <a href="#">Amazon Assistant</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 border-t border-gray-500 mt-20">
          <img
            src="
                   http://pngimg.com/uploads/amazon/amazon_PNG11.png
                  "
            alt=""
            className="w-20 h-20 object-contain"
          />
          <div className="flex gap-2">
            <div className="text-white text-sm flex justify-center items-center gap-2 border border-white rounded px-3 py-2 hover:bg-[#37475A] cursor-pointer">
              English
            </div>
            <div className="text-white text-sm flex justify-center items-center gap-2 border border-white rounded px-3 py-2 hover:bg-[#37475A] cursor-pointer">
              USD - U.S. Dollar
            </div>
            <div className="text-white text-sm flex justify-center items-center gap-2 border border-white rounded px-3 py-2 hover:bg-[#37475A] cursor-pointer">
              <a href="#">United States</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-10 text-sm text-white">
        © 1996-2023, Amazon.com, Inc. or its affiliates
      </div>
    </footer>
  );
}

export default Footer;
