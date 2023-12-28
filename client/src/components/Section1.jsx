import { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";

function Section1({ title, fetchUrl, addCart, ...rest }) {
  const [images, setImages] = useState([]);
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setImages(response.data);
    });
  }, []);

  const addToBasket = ({
    id,
    title,
    price,
    images,
    category,
    brand,
    rating,
  }) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        price,
        images,
        category,
        brand,
        rating,
      },
    });
  };

  return (
    <section
      className={`w-full sm:w-full lg:w-[76%] flex flex-col mx-auto my-8 bg-white py-4`}
      {...rest}
    >
      <h3 className="text-2xl font-semibold text-black mx-2">{title}</h3>
      <div className="grid grid-cols-5 lg:flex  space-x-2 overflow-x-hidden  overflow-y-hidden p-2 mx-2">
        {images?.map((image, index) => (
          <div className="flex flex-col gap-1" key={image.id}>
            <img
              src={image.images}
              alt=""
              className="lg:w-ufll h-[200px] object-contain rounded-lg transition duration-200 transform hover:scale-105 cursor-pointer"
            />
            <div
              className={`flex flex-col gap-1 items-start ${
                addCart ? "block" : "hidden"
              }`}
            >
              <h1 className="text-sm text-black w-[150px]">{image.title}</h1>
              <h1 className="text-sm text-black">{"$" + image.price}</h1>
              <h1 className="text-sm text-black">{image.description}</h1>
              <h1 className="text-sm text-black">{image.category}</h1>
              <h1 className="text-sm text-black">{image.brand}</h1>
              <h1 className="text-sm text-black">{image.rating}</h1>
              <button
                className={`bg-yellow-400  mb-5 hover:bg-yellow-500 px-2`}
                onClick={() => {
                  addToBasket(image);
                }}
                disabled={basket.some((item) => item.id === image.id)}
              >
                {basket.some((item) => item.id === image.id)
                  ? "Added"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section1;
