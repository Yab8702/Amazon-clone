import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [needHelp, setNeedHelp] = useState(false);
  const [icon, setIcon] = useState(true);
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test12");
  const navigate = useNavigate();
  const [{ login }, dispatch] = useStateValue();
  const signin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      alert(`Error (auth/invalid-email).`);
    }
  };

  return (
    <section className="flex flex-col  h-screen bg-gray-100">
      <div className="flex items-center justify-center ">
        <Link to="/">
          <img
            src="
                https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png
              "
            alt="amazon logo"
            className="w-24 h-24 mb-5 object-contain cursor-pointer"
          />
        </Link>
      </div>
      <div className="w-[380px] mx-auto flex flex-col  bg-gray-50 border border-solid border-[#ddd] p-5 -mt-10 shadow-md">
        <form className="flex flex-col" onSubmit={signin}>
          <h1 className="font-bold text-3xl mb-5">Sign In</h1>
          {/* <h5 className="mb-5">Email or mobile phone number</h5> */}
          <input
            type="email"
            className="p-2 mb-5  border   border-[#aaa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Email Or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 mb-5 border border-[#aaa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-yellow-400 p-2 mb-5 hover:bg-yellow-500">
            Sign In
          </button>
          <p className="mb-5">
            By continuing, you agree to Amazon's Conditions of Use and
            <a href="" className="text-blue-500 ml-2">
              Privacy Notice.
            </a>
          </p>
          <div className="flex flex-col gap-1 mb-4 pb-4 border-b">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setNeedHelp(!needHelp);
                setIcon(!icon);
              }}
            >
              {icon ? (
                <span>
                  <IoMdArrowDropright />
                </span>
              ) : (
                <span>
                  <IoMdArrowDropdown />
                </span>
              )}
              <a href="#" className="text-blue-500">
                Need help?
              </a>
            </div>

            {needHelp && (
              <div className="flex flex-col gap-2 text-sm ">
                <a href="#" className="text-blue-500">
                  Forgot your password?
                </a>
                <a href="#" className="text-blue-500">
                  Other issues with Sign-In
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs font-semibold gap-2">
            <span>Buying for work?</span>
            <span>
              <a href="#" className="text-blue-500  ">
                Shop on Amazon Business
              </a>
            </span>
          </div>
        </form>

        <div className="flex items-center justify-center bg-white p-5 gap-1">
          <hr className="border-1 w-1/4" />
          <span className="text-gray-400">New to Amazon?</span>
          <hr className="border-1 w-1/4" />
        </div>
        <div
          className="flex flex-col items-center justify-center bg-white p-5"
          style={{ width: "300px" }}
        >
          <Link to="/signup">
            <button className="bg-gray-200 p-2 mb-5">
              Create your Amazon account
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center  text-xs p-5 gap-2">
        <span className="text-blue-500">
          <a href="#">Conditions of Use & Sale</a>
        </span>
        <span className="text-blue-500">
          <a href="#">Privacy Notice</a>
        </span>
        <span className="text-blue-500">
          <a href="">Help</a>
        </span>
      </div>
      <div className="flex justify-center text-xs">
        <span className="text-gray-400 ">
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </span>
      </div>
    </section>
  );
}

export default SignIn;
