import { useEffect, useState } from "react";

const images = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <div className="relative w-full">
      <div className="relative h-80 overflow-hidden md:h-140">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 z-30 flex h-full items-center justify-center px-4"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50">
          ❮
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 z-30 flex h-full items-center justify-center px-4"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50">
          ❯
        </span>
      </button>
    </div>
  );
}