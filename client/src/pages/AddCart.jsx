import Footer from "../components/Footer";

import sponsor from "../assets/images/sponsor.jpg";

import Section1 from "../components/Section1";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

import { useStateValue } from "../context/StateProvider";
import { useLocation } from "react-router-dom";
function AddCart() {
  const [{ basket }, dispatch] = useStateValue();

  const location = useLocation();
  const { id, title, price, images } = location.state || {};
  //   console.log(location.state);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: 1,
        title,
        price,
        images,
      },
    });
  };
  return (
    <>
      <section>
        <div className="w-full">
          <img
            src={sponsor}
            alt=""
            className="w-full h-[80px] object-contain"
          />
        </div>
        <div className=" grid grid-cols-2 md:flex justify-center items-start gap-2 mt-14 text-sm text-white    ">
          <div className="md:w-1/4 flex flex-col gap-6 ">
            <div>
              <img
                src={images ? images[0] : "/vite.svg"}
                alt=""
                className=" h-[300px] object-cover rounded-lg transition duration-200 transform hover:scale-105 cursor-pointer"
              />
            </div>
            <div className="flex  items-center gap-2 cursor-pointer">
              {images?.map((image) => (
                <div>
                  <img
                    src={image}
                    alt=""
                    className="w-[100px] h-[100px] object-contain rounded-lg transition duration-200 transform hover:scale-105 cursor-pointer "
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col gap-6  text-black md:mt-10 ">
            <div
              className="flex flex-col  justify-center gap-3 cursor-pointer 
              
                "
            >
              <h2 className="text-[1.4em] font-bold text-left">{title}</h2>

              <span className="rating flex gap-2 items-center text-xl">
                5.0
                <div className="flex">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                </div>
                11,230 ratings
              </span>
              <span className="text-xl text-gray-500 flex items-center  mb-3">
                <span className="mr-3 text-orange-400 ">-50%</span>
                Price{"$" + price}
                <span className="text-gray-500 ml-3 line-through">$127.99</span>
              </span>
            </div>
            <div className="discription border-t py-4 border-gray-800">
              <p>
                (Piano/Vocal/Guitar Artist Songbook). Matching folio to Taylor's
                latest blockbuster, record-breaking, chart-topping album
                featuring 18 songs including: The Archer * Cruel Summer * I
                Think He Knows * London Boy * Lover * The Man * Me! * Paper
                Rings * You Need to Calm Down * and many more! Songs are
                arranged for piano and voice with guitar chord frames.
              </p>
            </div>
          </div>
          <div className="w-full md:w-[15%] flex flex-col justify-center border-2 text-black gap-6 mt-10 ml-28 p-4 shadow-md">
            <div className="flex justify-between items-center">
              <span>Price:</span>
              <span>{"$" + price}</span>
            </div>
            <div className="flex flex-col justify-between items-start gap-2">
              <p>
                Delivery{" "}
                <span className="text-sm font-semibold">
                  Monday, December 25
                </span>
              </p>
              <span>
                <a href="#" className="text-blue-500 flex items-center gap-1">
                  <HiOutlineLocationMarker className="text-black" />
                  Deliver to Ethiopia
                </a>
              </span>
            </div>
            <div className="flex flex-col ">
              <button
                className="bg-yellow-400 p-2 mb-5 hover:bg-yellow-500 rounded-full"
                onClick={addToBasket}
              >
                <span className="text-blue-500">Add to Cart</span>
              </button>
              <button className="bg-orange-400 p-2 mb-5 hover:bg-yellow-500 rounded-full">
                <span className="text-blue-500">Buy Now</span>
              </button>
            </div>
            <div className="flex flex-col  justify-center gap-2 cursor-pointer text-sm text-gray-500">
              <span>
                ships from{" "}
                <span className="font-semibold text-slate-600">
                  {" "}
                  Amazon.com
                </span>
              </span>
              <span>
                sold by{" "}
                <span className="text-slate-600 font-semibold ml-4">
                  Amazon.com
                </span>
              </span>
              <span>
                <a href="#">
                  Return
                  <span className="text-blue-500 ml-6">
                    Returnable until Jan 31, 2022
                  </span>
                </a>
              </span>
              <span className="text-blue-500">
                <span className="text-gray-500 mr-2">Payment </span> secure
                transaction
              </span>
            </div>
            <div className="flex flex-col  justify-center gap-2 cursor-pointer text-sm text-gray-500">
              <button className="bg-gray-300 p-2 mb-5 hover:bg-gray-400 ">
                <span className="text-blue-500">Add to List</span>
              </button>
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </section>
      {/* <Section1
        title="Most wished for in Movies & TV"
        fetchUrl={"/movies.json"}
        className="w-full h-[400px] object-contain bg-white p-3 mt-10"
        addCart={true}
      /> */}
      <Section1
        title="Best Sellers in Books"
        fetchUrl={"/book.json"}
        className="w-full  object-contain bg-white p-3"
        addCart={true}
      />
      <Footer />
    </>
  );
}

export default AddCart;
