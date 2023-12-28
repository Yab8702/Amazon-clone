import { useState } from "react";
import carouselOne from "../assets/images/carousel/carousel-1.jpg";
import carouselTwo from "../assets/images/carousel/carousel-2.jpg";
import carouselThree from "../assets/images/carousel/carousel-3.jpg";
import carouselFour from "../assets/images/carousel/carousel-4.jpg";
import carouselFive from "../assets/images/carousel/carousel-5.jpg";
import carouselSix from "../assets/images/carousel/carousel-6.jpg";
import carouselSeven from "../assets/images/carousel/carousel-7.jpg";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    carouselOne,
    carouselTwo,
    carouselThree,
    carouselFour,
    carouselFive,
    carouselSix,
    carouselSeven,
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <section className="carousel relative">
      <div className="carousel__container w-full lg:w-[78%] mx-auto relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel__item ${
              index === currentSlide ? "carousel__item--active" : ""
            }`}
            style={{
              display: index === currentSlide ? "block" : "none",
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <img src={slide} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
        <button
          className="carousel__prev absolute top-[35%] left-0 transform -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400"
          onClick={prevSlide}
        >
          <GrPrevious />
        </button>
        <button
          className="carousel__next absolute top-[35%] right-0 transform -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400"
          onClick={nextSlide}
        >
          <GrNext />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
