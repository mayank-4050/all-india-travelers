import React, { useEffect, useState } from "react";
import car1 from "/Photos/bmw.png";
import car2 from "/Photos/crysta.jpg";
import car3 from "/Photos/dzire.jpg";
import car4 from "/Photos/zest.jpg";

const cars = [
  { name: "BMW 5 Series", price: "₹8000 / day", img: car1 },
  { name: "Crysta", price: "₹7500 / day", img: car2 },
  { name: "Dzire", price: "₹9000 / day", img: car3 },
  { name: "Zest", price: "₹7000 / day", img: car4 },
];

// 🔹 Duplicate array for smooth loop
const sliderCars = [...cars, ...cars];

const MarriageCarSlider = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const slide = setInterval(() => {

      setIndex((prev) => {

        if (prev >= cars.length) {
          return 0;
        }

        return prev + 1;

      });

    }, 2500);

    return () => clearInterval(slide);

  }, []);

  return (
    <div className="overflow-hidden">

      <h2
        className="text-orange-600"
        style={{ fontFamily: "Dancing Script", fontSize: "38px" }}
      >
        Wedding Cars
      </h2>

      <div
        className="flex gap-4 transition-transform duration-700"
        style={{ transform: `translateX(-${index * 220}px)` }}
      >

        {sliderCars.map((car, i) => (
          <div
            key={i}
            className="min-w-[200px] bg-white rounded-xl shadow-lg hover:scale-105 transition p-3"
          >

            <img
              src={car.img}
              alt={car.name}
              className="w-full h-32 object-cover rounded-lg"
            />

            <h3 className="mt-2 font-semibold">
              {car.name}
            </h3>

            <p className="text-sm text-gray-500">
              {car.price}
            </p>

            {/* <button className="mt-2 w-full bg-red-500 text-white py-1 rounded">
              Book
            </button> */}

          </div>
        ))}

      </div>

    </div>
  );
};

export default MarriageCarSlider;