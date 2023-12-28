import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { FaTimes } from "react-icons/fa";
import Footer from "./Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckOutForm from "./CheckOutForm";
import reducerfun from "../context/reducer";
const { getBasketTotal } = reducerfun();
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [popup, setPopup] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const Axios = axios.create({
    baseURL: "https://amazon-backend-beta.vercel.app",
  });
  useEffect(() => {
    const getPublicKey = async () => {
      try {
        const response = await Axios.get("/config");
        const { PUBLIC_STRIPE_API_KEY } = response.data;
        setStripePromise(loadStripe(PUBLIC_STRIPE_API_KEY));
        // console.log("public key", PUBLIC_STRIPE_API_KEY);
      } catch (error) {
        console.log(error);
      }
    };
    getPublicKey();
  }, []);
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await Axios({
          method: "post",
          url: "/payments/create?total=" + getBasketTotal(basket) * 100,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
      // console.log("client secret", clientSecret);
    };

    getClientSecret();
  }, []);
  const popupPayment = () => {
    setPopup(true);
  };
  // console.log("basket", basket);
  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };
  return (
    <section>
      <div className="flex flex-col justify-center items-center bg-white">
        <div
          className=" flex 
        border-b-2 border-gray-200 pb-5 pt-5 w-full gap-10
        bg-gray-100
        "
        >
          <span className="w-full  text-center text-2xl font-bold ">
            checkout ({basket?.length} items)
          </span>
        </div>

        <div className="w-full flex  gap-10  mt-10 border-b justify-start ">
          <h1 className="text-2xl font-bold ml-4">
            Delivery <br /> Address
          </h1>
          <div className="flex flex-col gap-2 mr-10">
            <span className="text-lg font-bold">{user?.email || "Guest"}</span>
            <span className="text-lg font-bold">123 React Lane</span>
            <span className="text-lg font-bold">Los Angeles, CA</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2  mt-10  bg-white shadow-md pb-4">
          <h1 className="text-2xl font-bold ml-4 text-center">
            Review items and delivery
          </h1>
          <div
            className=" 
           grid lg:grid-cols-3 md:grid-cols-2 w-full mt-10  justify-start lg:ml-10
           gap-y-10
           
    
          "
          >
            {basket.map((item) => (
              <div className="flex justify-between items-center ">
                <div className="flex gap-4">
                  <img src={item.images} alt="" className="object-contain" />

                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold">{item.title}</span>
                    <span className="text-lg font-bold">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>{" "}
                    <span className="text-lg font-bold">
                      Qty: {item.quantity || 1}
                    </span>{" "}
                    <button
                      className="bg-yellow-400 px-1"
                      onClick={() => removeCart(item.id)}
                    >
                      Remove From cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center  mt-10">
          <button
            className="bg-yellow-400 px-4 py-2 text-gray-800 font-bold "
            onClick={popupPayment}
          >
            Proceed to checkout
          </button>
          <span className="text-lg font-bold ml-4 flex  ">
            Subtotal ({basket?.length} items): $
            {getBasketTotal(basket) > 0 ? getBasketTotal(basket) : ""}
          </span>
        </div>
        {popup && stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <CheckOutForm
              setPopup={setPopup}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Payment;
