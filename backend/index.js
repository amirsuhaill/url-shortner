const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const { nanoid } = require('nanoid')

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

//DB connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connect sucesfully"))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running")
})

//model
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema)

app.post('/api/short', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(200).json({ messg: "original url required" })
    }
    const shortUrl = nanoid(8)
    const url = new Url({ originalUrl, shortUrl })

    await url.save()
    return res.status(200).json({ messg: "URL generated", url: url })
  } catch (err) {
    console.log(err)
  }
})

app.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl: shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    }
    else {
      res.status(400).json({ mssg: "url db mein nahi hai" })
    }
  } catch (err) {
    console.log(err)
  }
})