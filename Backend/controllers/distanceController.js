const axios = require("axios");
require("dotenv").config();

const ORS_API_KEY = process.env.ORS_API_KEY;

const getCoordinates = async (place) => {
  const response = await axios.get("https://api.openrouteservice.org/geocode/search", {
    params: {
      api_key: ORS_API_KEY,
      text: place,
      size: 1
    }
  });

  const coords = response.data?.features?.[0]?.geometry?.coordinates;
  if (!coords) {
    throw new Error(`Coordinates not found for: ${place}`);
  }

  return coords;
};

exports.calculateDistance = async (req, res) => {
  const { from, to } = req.body;

  try {
    if (!from || !to) {
      return res.status(400).json({ error: "Both source and destination are required" });
    }

    const sourceCoords = await getCoordinates(from);
    const destCoords = await getCoordinates(to);

    console.log("From:", from, "Coords:", sourceCoords);
    console.log("To:", to, "Coords:", destCoords);

    const response = await axios.post(
      "https://api.openrouteservice.org/v2/matrix/driving-car",
      {
        locations: [sourceCoords, destCoords],
        metrics: ["distance", "duration"],
        units: "km"
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const distance = (response.data?.distances?.[0]?.[1] || 0).toFixed(2);
    const duration = Math.round((response.data?.durations?.[0]?.[1] || 0) / 60);

    res.json({ distance, duration });

  } catch (err) {
    console.error("Distance calculation error:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error:", err.message);
    }
    res.status(500).json({ error: "Failed to calculate distance", message: err.message });
  }
};
