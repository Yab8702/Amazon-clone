import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStateValue } from "../context/StateProvider";
import reducerfun from "../context/reducer";
import { Link } from "react-router-dom";
import { db } from "../lib/firbase";
import { doc, setDoc } from "firebase/firestore";
const { getBasketTotal } = reducerfun();
function CheckOutForm({ setPopup }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [decline, setDecline] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setDecline(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
      setDecline(true);
      elements.getElement(PaymentElement).clear();
      await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // console.log("paymentIntent", paymentIntent);
      // console.log("basket", basket);

      // db.collection("users")
      //   .doc(user?.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });
      dispatch({
        type: "EMPTY_BASKET",
      });
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-900 bg-opacity-70 fixed top-0 left-0 flex justify-center items-center">
        {!message || !decline ? (
          <div className="w-3/4 lg:w-1/4  bg-white flex flex-col lg:justify-center items-center lg:gap-4">
            <div
              className="relative w-full flex justify-between items-center lg:p-4"
              style={{ background: "#fcd200" }}
            >
              <h1 className="text-3xl font-bold text-gray-800">Payment</h1>

              <div
                className="absolute cursor-pointer top-2 right-2"
                onClick={() => setPopup(false)}
              >
                <FaTimes className="text-2xl text-gray-500" />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-center lg:gap-4"
              >
                <PaymentElement className="w-12/12 mx-auto flex p-6 " />
                <button
                  disabled={
                    isProcessing ||
                    !stripe ||
                    !elements ||
                    basket.length < 1 ||
                    !user
                  }
                  className="bg-yellow-400 px-4 py-2 text-gray-800 font-bold"
                >
                  <span id="button-text">
                    {isProcessing
                      ? "Processing..."
                      : `Pay Now ${
                          getBasketTotal(basket) > 0
                            ? "$" + getBasketTotal(basket)
                            : ""
                        }`}
                  </span>
                </button>
              </form>
            </div>

            {message ||
              (decline && (
                <div className="text-center text-red-500 mt-4">{message}</div>
              ))}
          </div>
        ) : (
          <div className="w-3/4 lg:w-1/4  bg-white flex flex-col  gap-4 ">
            <div className="relative w-full flex justify-center items-center p-4 text-2xl text-green-500">
              {message}
            </div>
            <div className="w-full justify-center flex text-yellow-700 gap-4 text-xl pb-2">
              <Link to="/" className="text-blue-500 hover:underline">
                Home
              </Link>
              <Link to="/addcart" className="text-blue-500 hover:underline">
                Add Cart
              </Link>
              <Link to="/orders" className="text-blue-500 hover:underline">
                Order Review
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckOutForm;
