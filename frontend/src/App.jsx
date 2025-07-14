import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const BASE_BACKEND_URL = 'http://localhost:3000';
  const handleShorten = () => {
    // Send the original URL to the Vercel backend for shortening
    axios.post(`${BASE_BACKEND_URL}/api/short`, { originalUrl })
      .then((res) => {
        // Construct the full short URL using the Vercel backend base URL
        setShortUrl(`${BASE_BACKEND_URL}/${res.data.url.shortUrl}`);
        setMessage('');
      })
      .catch((err) => {
        console.error("Error shortening URL:", err); // Use console.error for errors
        setMessage("Something went wrong. Please ensure the URL is valid and the backend is running.");
      });
  }

  const handleCopy = async () => {
    try {
      // Check if shortUrl exists before attempting to copy
      if (shortUrl) {
        await navigator.clipboard.writeText(shortUrl);
        setMessage("Copied to clipboard!");
      } else {
        setMessage("No short URL to copy!");
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      setMessage("Failed to copy! Please try again or copy manually.");
    }
  };

  const handleRedirect = () => {
    // Open the short URL in a new tab if it exists
    if (shortUrl) {
      window.open(shortUrl, '_blank');
    } else {
      setMessage("No short URL to redirect to!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">Shorten Your URLs</h1>
        <p className="text-center text-gray-600">
          Transform long, unwieldy URLs into short, shareable links. Track clicks and manage your links with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-gray-700 mb-2">Your Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-lg font-medium break-words">
              {shortUrl}
            </a>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={!shortUrl} // Disable if no short URL is generated
          >
            Copy
          </button>

          <button
            onClick={handleRedirect}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
           disabled={!shortUrl} // Disable if no short URL is generated
          >
            Redirect
          </button>
        </div>

        {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default App;