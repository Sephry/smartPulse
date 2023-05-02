const axios = require("axios").default;
const crypto = require("crypto");
const https = require("https");

export default async function handler(req, res) {
  const today = new Date();
  const todayDateFormat = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  try {
    const response = await axios({
      url: "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        startDate: todayDateFormat,
        endDate: todayDateFormat,
      },
      httpsAgent: new https.Agent({
        // for self signed you could also add
        // rejectUnauthorized: false,

        // allow legacy server
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
