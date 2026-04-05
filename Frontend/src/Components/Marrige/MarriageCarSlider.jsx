import React, { useEffect, useState } from "react";
import car2 from "/Photos/crysta.jpg";
import car3 from "/Photos/dzire.jpg";
import car4 from "/Photos/zest.jpg";
import innova from "/Photos/innova.png"
import ertiga from "/Photos/ertiga.webp"
import traveller from "/Photos/traveller.png"
const cars = [
  { name: "Crysta", img: car2 },
  { name: "Dzire", img: car3 },
  { name: "Zest", img: car4 },
  { name: "innova", img: innova },
  { name: "ertiga", img: ertiga },
  { name: "traveller", img: traveller },
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
         Monthly Cab Bookings
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