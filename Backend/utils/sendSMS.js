const axios = require("axios");

const sendSMS = async (numbers, message) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",  // ya "p" agar transactional approved hai
        message: message,
        language: "english",
        numbers: numbers,  // multiple numbers ho to comma-separated string "9876543210,9876543211"
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ SMS sent:", response.data);
  } catch (error) {
    console.error("❌ SMS error:", error.response?.data || error.message);
  }
};

module.exports = sendSMS;
