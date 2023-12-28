import Footer from "../components/Footer";
import { useStateValue } from "../context/StateProvider";
import reducerfun from "../context/reducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { getBasketTotal } = reducerfun();
function Cart() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState([]);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  const handleQuantityChange = (id, value) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: value,
    }));

    dispatch({
      type: "CHANGE_QUANTITY",
      id,
      quantity: value,
    });
  };
  const calculateSubtotal = (item) => {
    return item.price * (quantity[item.id] || 1);
  };
  const calculateTotal = () => {
    let total = 0;
    basket.forEach((item) => {
      total += calculateSubtotal(item);
    });
    return total.toFixed(2);
  };
  const checkLogin = () => {
    if (user) {
      navigate("/payment");
    } else {
      navigate("/signin");
    }
  };
  return (
    <section className="bg-white">
      {basket.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <img
                src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
                alt=""
                className="w-1/2"
              />
              <h1 className="text-2xl font-bold">
                Your Amazon Basket is empty
              </h1>
              <p className="text-sm">
                Your shopping cart is waiting. Give it purpose – fill it with
                groceries, clothing, household supplies, electronics and more.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-9/12 mx-auto max-w-screen-lg:flex-col lg:flex justify-between items-start gap-2 mt-4">
          <div className="grid grid-cols-1 w-full lg:w-9/12  flex-col shadow-md border">
            <div className="w-11/12 mx-auto flex justify-between py-4 border-b">
              <h1 className="text-2xl text-gray-800">Shopping Cart</h1>
              <span className="text-sm text-gray-500">Price</span>
            </div>
            {basket.map((item) => (
              <div
                className="w-full lg:w-11/12 mx-auto flex py-6 border-b"
                key={item.id}
              >
                <div className="w-1/4 flex cursor-pointer">
                  <img src={item.images} alt="" />
                </div>
                <div className="w-full lg:w-1/4 flex flex-col justify-start gap-4">
                  <h1>{item.title}</h1>
                  <span className="text-sm flex gap-1">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={checked && "checked"}
                    />
                    <span>
                      This is a gift
                      <a href="" className="text-blue-500 ml-2">
                        Learn more
                      </a>
                    </span>
                  </span>
                  <div className="quantity relative">
                    <div className="flex gap-2">
                      <select
                        className="flex items-center bg-gray-200 text-[#555] px-4 py-1 shadow-sm"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      >
                        <option value={1}>Qty:1</option>
                        <option value={2}>Qty:2</option>
                        <option value={3}>Qty:3</option>
                        <option value={4}>Qty:4</option>
                        <option value={5}>Qty:5</option>
                        <option value={6}>Qty:6</option>
                        <option value={7}>Qty:7</option>
                        <option value={8}>Qty:8</option>
                      </select>
                      <button
                        className="bg-yellow-400 px-1"
                        onClick={() => removeCart(item.id)}
                      >
                        Remove From cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 flex gap-1 cursor-pointer justify-end">
                  <span className="text-right flex justify-end">
                    {"$" + (item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex justify-end text-2xl py-4 mr-10">
              <h3>
                Subtotal ({basket.length} item): {"$" + getBasketTotal(basket)}
              </h3>
            </div>
          </div>
          <div className="w-full lg:w-3/12 flex flex-col items-start gap-3 shadow-md py-4 px-8 text-lg">
            <h1 className="text-xl">
              Subtotal ({basket.length} item): {"$" + getBasketTotal(basket)}
            </h1>
            <span className="text-sm flex gap-1">
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => setChecked(!checked)}
              />
              <span>This order contains a gift</span>
            </span>

            <button
              className="bg-yellow-400 w-full hover:bg-yellow-500 py-1"
              onClick={checkLogin}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </section>
  );
}

export default Cart;
