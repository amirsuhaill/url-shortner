const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { nanoid } = require('nanoid');

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connect successfully"))
    .catch((err) => console.error("DB connection error:", err)); // Use console.error for errors

// Model
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

// API endpoint to shorten URL
app.post('/api/short', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ messg: "Original URL required" }); // Use 400 for bad request
        }
        const shortUrl = nanoid(8);
        const url = new Url({ originalUrl, shortUrl });

        await url.save();

        return res.status(201).json({ messg: "URL generated", url: url }); // Use 201 for resource created

    } catch (err) {
        console.error("Error shortening URL:", err);
        return res.status(500).json({ messg: "Internal server error" }); // Return 500 on server error
    }
});

// API endpoint for redirection
app.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl: shortUrl });
        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ mssg: "URL not found" }); // Use 404 for not found
        }
    } catch (err) {
        console.error("Error redirecting URL:", err);
        return res.status(500).json({ mssg: "Internal server error" }); // Return 500 on server error
    }
});

// Export the app for Vercel
module.exports = app;