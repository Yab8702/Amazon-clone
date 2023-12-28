import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { FiShoppingCart } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { IoRadioButtonOffOutline } from "react-icons/io5";
import { RiArrowUpSFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { auth } from "../lib/firbase";
import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);
  const [{ basket, user, logout }, dispatch] = useStateValue();
  // const navigate = useNavigate();
  const [title, setTitle] = useState("All");
  const titles = [
    "All Department",
    "Arts & Crafts",
    "Automotive",
    "Beauty & Personal Care",
    "Boys' Fashion",
    "Deals",
    "Digital Music",
    "Electronics",
    "Girls' Fashion",
    "Health & Household",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Kindle Store",
    "Luggage",
    "Men's Fashion",
  ];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      dispatch({
        type: "SET_USER",
        user: currentUser,
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log(user);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownItemClick = (item) => {
    setTitle(item);
    setIsDropdownOpen(false);
  };
  const handleLanguageDropdownClick = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };
  const handleSignInDropdownClick = () => {
    setIsSignInDropdownOpen(!isSignInDropdownOpen);
  };
  return (
    <>
      <header className="w-full" id="header">
        <div className="max-w-screen-md:flex-col max-w-screen-md:py-10 md:flex items-center w-full bg-[#00453e] p-2 text-white gap-8">
          <div className="flex items-center md:ml-8 gap-4 w-full justify-center md:w-1/12">
            <div className="flex items-center justify-center w-24 h-12  cursor-pointer">
              <Link to="/">
                <img
                  src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                  className="w-full h-full object-contain"
                ></img>
              </Link>
            </div>
            <div
              className="location
            hidden lg:flex flex-col items-center justify-center cursor-pointer 
          "
            >
              <span className="text-xs text-gray-300">Deliver to</span>
              <span className="flex items-center justify-center gap-1 cursor-pointer ">
                <HiOutlineLocationMarker />{" "}
                <span className="text-sm font-bold"> Ethiopia</span>
              </span>
            </div>
          </div>

          <div className="flex items-center w-full md:w-8/12 justify-center ">
            <div
              className="flex items-center cursor-pointer relative gap-2"
              onClick={handleDropdownClick}
            >
              <div className="flex justify-between items-center  text-black  bg-gray-300 py-2 pl-1 pr-7 outline-none ">
                <span className="text-black ">{title} </span>
                <span className="text-sm absolute top-3 right-2">
                  <FaCaretDown />
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-10 left-0 w-[300px] bg-gray-100 z-20 shadow-md text-black">
                  <ul className="py-2">
                    {titles.map((item) => (
                      <li
                        className="px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleDropdownItemClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className=" w-[80%] flex items-center   text-gray-300 cursor-pointer ">
              <input
                type="text"
                className="w-full p-2 outline-none"
                placeholder="Search Amazon"
              />
            </div>
            <div className="  flex items-center justify-center cursor-pointer text-black">
              <button className="bg-yellow-400 py-2 px-4 ">
                <span className="flex items-center justify-center text-black text-2xl">
                  <IoIosSearch />
                </span>
              </button>
            </div>
          </div>
          <div className="  flex items-center md:justify-between w-full lg:w-3/12 cursor-pointer  gap-10 md:gap-0 mx-2 mt-4 md:mt-0">
            <div
              className={`language relative `}
              onMouseEnter={handleLanguageDropdownClick}
              onMouseLeave={handleLanguageDropdownClick}
            >
              <span className="flex items-center justify-center gap-1 cursor-pointer">
                <span className="text-2xl font-bold text-black">
                  <LiaFlagUsaSolid />
                </span>
                <span> EN</span>
                <span className="text-sm font-bold text-gray-500">
                  <FaCaretDown />
                </span>
              </span>
              {isLanguageDropdownOpen && (
                <div className="absolute top-10 left-0 w-[270px] bg-white z-20 shadow-md text-gray-600 ">
                  <span className="text-[2.6rem] absolute -top-6 left-10 text-white">
                    <RiArrowUpSFill />
                  </span>

                  <h3 className="flex  items-center ml-6 mt-4 text-sm gap-4">
                    Change language
                    <a href="" className="text-sm font-bold text-blue-500">
                      Learn more
                    </a>
                  </h3>
                  <ul className="py-2 px-2 flex flex-col [&>*]:mx-1 text-sm ">
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center border-b ">
                      <span className="flex items-center default">
                        <IoIosRadioButtonOn
                          className="default"
                          style={{
                            color: "rgb(248,113,113)",
                            border: "1px solid #555",
                            borderRadius: "50%",
                            padding: "1px",
                          }}
                        />
                      </span>
                      <span>English - EN</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Amharic - AM</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Oromiffa - OM</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Tigrigna - TI</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Wolaytta - WO</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Sidama - SI</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>español - ES</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>العربية - AR</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>Deutsch - DE</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>עברית - HE</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 item-center border-b">
                      <span className="flex items-center">
                        <IoRadioButtonOffOutline />
                      </span>
                      <span>한국어 - KO</span>
                    </li>
                  </ul>
                  <h3 className="flex  items-center ml-4 mt-1 text-xs gap-4">
                    Change language
                    <a href="" className="text-xs font-bold text-blue-500">
                      Learn more
                    </a>
                  </h3>
                  <span className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 text-sm border-b">
                    <span>$ - USD - US Dollar </span>
                    <span>
                      <a href="#">
                        <span className="text-sm font-bold text-blue-500">
                          change
                        </span>
                      </a>
                    </span>
                  </span>
                  <span className="flex flex-col px-4 py-2 hover:bg-gray-200 text-sm">
                    <span className="flex  hover:bg-gray-200 text-sm gap-2">
                      <span>
                        <LiaFlagUsaSolid />
                      </span>
                      <span>You are shopping on</span>
                    </span>
                    <span>Amazon.com</span>
                  </span>
                  <span>
                    <a
                      href="#"
                      className="flex items-center justify-center px-4 py-2 hover:bg-gray-200 text-sm text-blue-500"
                    >
                      <span>Change country/region.</span>
                    </a>
                  </span>
                </div>
              )}
            </div>
            <div
              className="flex flex-col items-center cursor-pointer leading-4
            signin relative
            "
              onMouseEnter={handleSignInDropdownClick}
              onMouseLeave={handleSignInDropdownClick}
            >
              <span className="text-sm text-gray-100">
                Hello, {user ? user.email : "sign In"}
              </span>
              <span className="text-sm font-bold text-white flex gap-1 item-center">
                Account & Lists
                <span className="text-sm font-bold text-gray-500 mt-1">
                  <FaCaretDown />
                </span>
              </span>
              {isSignInDropdownOpen && (
                <div className="absolute top-12 -left-32 w-[410px] bg-white z-20 shadow-md text-gray-600 ">
                  <span className="text-[2.6rem] absolute -top-6 right-[34.5%] text-white">
                    <RiArrowUpSFill />
                  </span>
                  <ul className="py-2 px-2 flex flex-col [&>*]:mx-1 text-sm ">
                    <li className="px-4 py-2  item-center border-b ">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Link to={!user && "/signin"}>
                          <button
                            className="bg-yellow-400 py-1 px-24 
                      text-black text-sm font-bold rounded-md
                        "
                            onClick={() => logout()}
                          >
                            {user ? "SignOut" : "SignIn"}
                          </button>
                        </Link>
                        <span className="text-xs text-gray-500">
                          New customer?
                          <a
                            href="#"
                            className="text-xs font-bold text-blue-500"
                          >
                            Start here.
                          </a>
                        </span>
                      </div>
                    </li>
                    <li className="px-4 py-2 flex gap-2 item-center justify-between">
                      <div
                        className="flex flex-col gap-2 
                      "
                      >
                        <span className="text-sm font-bold text-black-500">
                          Your Lists
                        </span>
                        <ul>
                          <li>
                            <a href="">
                              <span className="text-xs text-gray-500">
                                create a list
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="text-xs text-gray-500">
                                Find a List or Registry
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="flex flex-col gap-2 border-l pl-8 
                      "
                      >
                        <span className="text-sm font-bold text-black-500">
                          Your Account
                        </span>
                        <ul>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Account
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Orders
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Recommendations
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Browsing History
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Watchlist
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Video Purchases & Rentals
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Kindle Unlimited
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Content & Devices
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Subscribe & Save Items
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Memberships & Subscriptions
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-xs text-gray-500">
                              Music Library
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/orders">
              <div className="flex flex-col items-center cursor-pointer leading-4">
                <span className="text-sm text-gray-100">Returns</span>
                <span className="text-sm font-bold text-white">& Orders</span>
              </div>
            </Link>
            <Link to="/cart">
              <div className="relative flex items-center cursor-pointer gap-1">
                <span className="text-2xl">
                  <span className="absolute -top-3 text-lg left-3 font-bold text-yellow-400">
                    {basket.length}
                  </span>
                  <FiShoppingCart style={{ fontSize: "2rem" }} />
                </span>
                <span className="text-sm mt-4 font-semibold">Cart</span>
              </div>
            </Link>
          </div>
        </div>
        <div className=" w-full bg-[#195851] p-2">
          <div className="flex items-center  text-white gap-2 md:gap-8  text-sm font-bold ml-4">
            <a href="#" className="flex items-center gap-1">
              <span className="text-2xl">
                <FiMenu />
              </span>
              <span> All</span>
            </a>
            <a href="#">
              <span>Today's Deal</span>
            </a>
            <a href="#">
              <span>Registry</span>
            </a>
            <a href="#">
              <span>Customer Service</span>
            </a>
            <a href="#">
              <span>Gift Cards</span>
            </a>
            <a href="#">
              <span>Sell</span>
            </a>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
