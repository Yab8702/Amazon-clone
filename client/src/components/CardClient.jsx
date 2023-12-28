import { Link } from "react-router-dom";

const CardClient = (props) => {
  const { absolute, top, relative, items } = props;
  // console.log(items[0].id);

  return (
    <section className={`w-full mx-auto my-8 ${absolute} ${top} ${relative}`}>
      <div className="grid grid-cols-2 lg:flex justify-between items-center gap-4 w-11/12 lg:w-[76%] mx-auto">
        {items?.map((item) => (
          <div
            className="card__client h-[420px] flex flex-col justify-between w-full  lg:w-1/4 bg-white p-4 shadow-md"
            key={item.id}
          >
            <h3 className="text-xl font-bold text-left">{item.title}</h3>
            <div className="flex flex-col justify-center gap-1 cursor-pointer">
              <img
                src={item.images[0]}
                alt=""
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="footer flex gap-1 cursor-pointer">
              <Link
                to="/addcart"
                state={item}
                onClick={() => {
                  // console.log({ item });
                }}
                className="text-sm text-blue-500 text-left"
              >
                <span className="">Shop Now</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardClient;
