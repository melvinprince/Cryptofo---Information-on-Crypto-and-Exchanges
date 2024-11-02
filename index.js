import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL = "https://api.coinlore.net/api/";
const APIKey = "6ea8f2da-1203-4254-8208-cb4d8ce5dfaf";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const cryptoResponse = await axios.get(`${URL}tickers/`);
    const exchangeResponse = await axios.get(
      `https://api.coinlore.net/api/exchanges/`
    );
    const cryptoData = { cryptoData: cryptoResponse.data.data };
    const exchangeData = { exchangeData: Object.values(exchangeResponse.data) };
    res.render("index", { cryptoData, exchangeData});
  } catch (error) {
    console.error(error);
  }
});

app.post("/cryptodetails", async (req, res) => {
  const cryptoId = req.body.cryptoId;
  const response = await axios.get(`${URL}ticker/?id=${cryptoId}`);
  res.render("cryptoDetails.ejs", { data: response.data });
});

app.post("/exchangedetails", async (req, res) => {
  const exchangeId = req.body.exchangeId;
  const response = await axios.get(
    `https://api.coinlore.net/api/exchange/?id=${exchangeId}`
  );
  res.render("exchangeDetails.ejs", { exchangeData: response.data });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
