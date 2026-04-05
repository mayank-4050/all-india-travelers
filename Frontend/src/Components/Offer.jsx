import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const vehicleImages = {
    Dzire: Dzire,
    Crysta: Crysta,
    Tavera: Tavera,
    Zest: Zest,
    Ertiga: Ertiga,
  };

 useEffect(() => {
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers");
      if (res.data.success) {
        const now = new Date().getTime();

        const activeOffers = res.data.data.filter((offer) => {
          try {
            // 1. Date ko handle karein (Agar DD-MM-YYYY hai toh format badlein)
            // Agar aapki date "2026-04-01" hai toh ye sahi chalega
            // Agar date "01-04-2026" hai toh split/reverse zaroori hai
            let datePart = offer.date;
            if (datePart.includes("-") && datePart.split("-")[0].length === 2) {
                datePart = datePart.split("-").reverse().join("-");
            }

            // 2. Time ko clean karein (Agar 12-hour format AM/PM hai)
            const timePart = offer.endTime; // Ya startTime jo aap use kar rahe hon

            // 3. Final Comparison
            const expiryTime = new Date(`${datePart} ${timePart}`).getTime();

            // Check: Agar Date invalid hui toh offer dikha do (safety check)
            if (isNaN(expiryTime)) return true; 

            return expiryTime > now; // Sirf wo jo abhi khatam nahi hue
          } catch (e) {
            return true; // Error aane par offer hide mat karo
          }
        });

        setOffers(activeOffers);
      }
    } catch (err) {
      console.error("❌ Error fetching offers:", err);
    }
  };
  fetchOffers();
}, []);


  const CountdownTimer = ({ targetDate, startTime }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const calculateTimeLeft = () => {
        // Date aur Time ko combine karke target timestamp banana
        // Note: format 'YYYY-MM-DD HH:mm' hona chahiye
        const target = new Date(`${targetDate} ${startTime}`).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
          setTimeLeft("Offer Expired");
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };

      const timer = setInterval(calculateTimeLeft, 1000);
      calculateTimeLeft(); // Initial call

      return () => clearInterval(timer);
    }, [targetDate, startTime]);

    return (
      <span className="text-red-500 font-bold text-xs animate-pulse">
        {timeLeft}
      </span>
    );
  };


  return (
    <div className="p-6 bg-gray-50">
      <h2
        className="text-center text-orange-600 mb-6"
        style={{ fontFamily: "Dancing Script", fontSize: "38px" }}
      >
        One way travel offer
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No offers available.</p>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="overflow-x-auto hidden md:block shadow-lg rounded-xl">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-orange-200 text-gray-800 text-sm">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Route</th>
                  <th className="p-3 border">Vehicle</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Remaining Time</th>
                  <th className="p-3 border">Distance</th>
                  <th className="p-3 border">Seats</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Agency</th>
                  <th className="p-3 border">Contact</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {offers.map((offer) => (
                  <tr key={offer._id} className="text-center hover:bg-gray-50 transition">
                    <td className="p-2 border">
                      <img
                        src={vehicleImages[offer.vehicle]}
                        alt={offer.vehicle}
                        className="w-20 h-14 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="p-2 border font-medium">
                      {offer.from} → {offer.to}
                    </td>

                    <td className="p-2 border">
                      {offer.vehicle} ({offer.seats})
                    </td>

                    <td className="p-2 border">{offer.date}</td>

                    <td className="p-2 border">
                      {offer.startTime} - {offer.endTime}
                    </td>

                    <td className="p-2 border">
                      <CountdownTimer targetDate={offer.date} startTime={offer.startTime} />
                    </td>

                    <td className="p-2 border">
                      {offer.distance || "—"} km
                    </td>

                    <td className="p-2 border">{offer.seats}</td>

                    <td className="p-2 border font-bold text-green-600 text-lg">
                      ₹{offer.amount}
                    </td>

                    <td className="p-2 border text-sm font-semibold text-gray-700">
                      {offer.agencyName || "Official All India Travel"}
                    </td>

                    <td className="p-2 border text-blue-600 text-sm">
                      {offer.agencyPhone || "N/A"}
                    </td>

                    <td className="p-2 border">
                      <button
                        onClick={() =>
                          navigate("/offerconvehical", { state: { offer } })
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARD ================= */}
          <div className="md:hidden space-y-5">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white rounded-xl shadow-md p-4 space-y-2"
              >
                <img
                  src={vehicleImages[offer.vehicle]}
                  alt={offer.vehicle}
                  className="w-full h-36 object-cover rounded-lg"
                />

                <h2 className="text-lg font-semibold">
                  {offer.from} → {offer.to}
                </h2>

                <p className="text-sm text-gray-600">
                  {offer.vehicle} ({offer.seats} seats)
                </p>

                <p className="text-sm">
                  <strong>Date:</strong> {offer.date}
                </p>

                <p className="text-sm">
                  <strong>Time:</strong> {offer.startTime} - {offer.endTime}
                </p>

                <p className="text-sm">
                  <strong>Expires In:</strong> <CountdownTimer targetDate={offer.date} startTime={offer.startTime} />
                </p>

                <p className="text-sm">
                  <strong>Distance:</strong> {offer.distance || "—"} km
                </p>

                <p className="text-green-600 text-xl font-bold">
                  ₹{offer.amount}
                </p>

                <div className="bg-gray-100 p-2 rounded-lg text-sm">
                  <p>
                    <strong>Agency:</strong>{" "}
                    {offer.agencyName || "Official All India Travel"}
                  </p>
                  <p className="text-blue-600">
                    📞 {offer.agencyPhone || "N/A"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/offerconvehical", { state: { offer } })
                  }
                  className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg w-full"
                >
                  Confirm Booking
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Offer;
