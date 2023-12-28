import { getDocs, collection } from "firebase/firestore";
import { useStateValue } from "../context/StateProvider";
import { db } from "../lib/firbase";
import { useEffect, useState } from "react";
import moment from "moment";
import reducerfun from "../context/reducer";
const { getBasketTotal } = reducerfun();
function Order() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const getOrders = async () => {
        const querySnapshot = await getDocs(
          collection(db, "users", user?.uid, "orders")
        );
        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrders(orders);
      };
      getOrders();
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-white">
        <h1 className="text-2xl font-semibold text-black my-4">Your Orders</h1>
        <div className=" w-full  md:w-7/12 flex flex-col justify-center items-center bg-white ">
          <div className="w-full  flex flex-col justify-center items-center bg-white">
            {orders?.map((order) => (
              <div className="w-full flex flex-col mt-10 bg-white shadow-xl p-4">
                <h1
                  className="text-2xl font-semibold text-black
                    my-4 flex justify-between items-center
                "
                >
                  <span>Order</span>
                  <span className="text-sm font-semibold text-black">
                    {order.id}
                  </span>
                </h1>
                <p className="w-full text-lg  text-black  ">
                  {moment
                    .unix(order.data.created)
                    .format("MMMM Do YYYY, h:mma")}
                </p>
                <div className=" grid grid-cols-3 mt-10 ml-10 gap-y-10 gap-x-10">
                  {order.data.basket?.map((item) => (
                    <div
                      className="
                        flex flex-col gap-2
                    "
                    >
                      <div className="flex flex-col  items-center">
                        <img
                          src={item.images}
                          alt={item.title}
                          className="w-full h-[50%] object-contain"
                        />{" "}
                        <h1 className="text-xl font-semibold text-black ">
                          {item.title}
                        </h1>
                        <h1 className="text-xl font-semibold text-black ">
                          {"$" + item.price}
                        </h1>
                        <h1 className="text-xl font-semibold text-black ">
                          Qty: {item.quantity || 1}
                        </h1>
                        <h1 className="text-xl font-semibold text-black ">
                          {item.category}
                        </h1>
                        <h1 className="text-xl font-semibold text-black ">
                          {item.brand}
                        </h1>
                        <h1 className="text-xl font-semibold text-black ">
                          {item.rating}
                        </h1>
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <h1 className="text-2xl font-semibold text-black my-4">
                    Subtotal: ${getBasketTotal(order.data.basket)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
