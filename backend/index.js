// api/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
const serverless = require("serverless-http"); // <-- important

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection (ensure it only connects once)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));
}

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 }
});

const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);

app.post("/api/short", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ messg: "original url required" });
    }
    const shortUrl = nanoid(8);
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    return res.status(200).json({ messg: "URL generated", url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ messg: "URL not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the serverless function
module.exports = app;
module.exports.handler = serverless(app);
