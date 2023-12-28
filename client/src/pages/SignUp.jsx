import { Link } from "react-router-dom";
import { BsInfoLg } from "react-icons/bs";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function SignUp() {
  const [{ signUp }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const register = async (e) => {
    setSubmit(true);
    e.preventDefault();
    try {
      if (email !== "" && password !== "" && confirmPassword !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          password === confirmPassword &&
          password.length >= 6 &&
          emailRegex.test(email)
        ) {
          await signUp(email, password);
          navigate("/");
        } else {
          setError("password doesn't match or password < 6");
        }
      } else {
        setError("Field cannot be empty");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex flex-col  h-screen bg-gray-100">
      <div className="flex items-center justify-center">
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
        <form className="flex flex-col" onSubmit={register}>
          <h1 className="font-bold text-3xl mb-5">Sign Up</h1>
          <div className="erro">
            <span className="text-red-500 text-sm">{submit && error}</span>
          </div>
          <input
            type="email"
            className="p-2 mb-5  border   border-[#aaa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Email Or Phone Number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 mb-5 border border-[#aaa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-xs text-gray-500 flex items-center -mt-3 mb-3">
            <BsInfoLg className=" text-blue-600 mr-1" />
            Passwords must be at least 6 characters.
          </span>
          <input
            type="password"
            className="p-2 mb-5 border border-[#aaa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Re-enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="bg-yellow-400 p-2 mb-5 hover:bg-yellow-500">
            Sign Up
          </button>
          <div className="border-b pb-4 text-sm">
            <p>
              By creating an account, you agree to Amazon's Conditions of Use
              and
              <a href="" className="text-blue-500 ml-2">
                Privacy Notice.
              </a>
            </p>
          </div>

          <div className="flex flex-col text-xs font-semibold gap-2 mt-5 border-b pb-4">
            <span>Buying for work?</span>
            <span>
              <a href="#" className="text-blue-500  ">
                create a free business account
              </a>
            </span>
          </div>
        </form>

        <div className="flex items-start  mt-5">
          <p className=" text-sm text-gray-500">
            Already have an account?
            <Link to="/signin" className="text-blue-500  ml-1">
              Sign in
            </Link>
          </p>
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

export default SignUp;
