# URL Shortener (MERN Stack)

**This is a full-stack URL shortener application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to convert long, unwieldy URLs into short, shareable links and tracks the number of clicks on each shortened URL.**

## Features

* **URL Shortening** **: Convert any long URL into a compact, unique short URL.**
* **Click Tracking** **: Automatically counts and stores the number of times a shortened URL is accessed.**
* **Redirection** **: Redirects users from the short URL to the original long URL.**
* **Copy to Clipboard** **: Easily copy the generated short URL to your clipboard.**
* **Responsive Design** **: A user-friendly interface that adapts to various screen sizes.**

## Technologies Used

### Backend (Node.js, Express.js, MongoDB)

* **Node.js** **: JavaScript runtime environment.**
* **Express.js** **: Web application framework for Node.js, used for building RESTful APIs.**
* **Mongoose** **: MongoDB object data modeling (ODM) for Node.js, simplifying database interactions.**
* **MongoDB Atlas** **: Cloud-based NoSQL database for storing URL data.**
* **`<span class="selected">nanoid</span>`** **: A tiny, secure, URL-friendly, unique string ID generator.**
* **`<span class="selected">cors</span>`** **: Middleware to enable Cross-Origin Resource Sharing.**
* **`<span class="selected">dotenv</span>`** **: Loads environment variables from a **`<span class="selected">.env</span>` file.

### Frontend (React)

* **React** **: A JavaScript library for building user interfaces.**
* **Vite** **: A fast build tool for modern web projects.**
* **Axios** **: Promise-based HTTP client for making API requests.**
* **Tailwind CSS** **: A utility-first CSS framework for rapid UI development.**

## Setup Instructions

**Follow these steps to set up and run the project locally.**

### Prerequisites

* **Node.js (v14 or higher)**
* **npm (v6 or higher) or Yarn (v1 or higher)**
* **MongoDB Atlas Account (or local MongoDB instance)**

### 1. Clone the Repository

```
git clone <your-repository-url>
cd url-shortener

```

### 2. Backend Setup

**Navigate into the **`<span class="selected">backend</span>` directory:

```
cd backend

```

**Install Dependencies:**

```
npm install
# or
yarn install

```

**Create `<span class="selected">.env</span>` file:**

**Create a file named **`<span class="selected">.env</span>` in the `<span class="selected">backend</span>` directory and add your MongoDB connection string:

```
DATABASE_URL="YOUR_MONGODB_CONNECTION_STRING"

```

**Replace **`<span class="selected">"YOUR_MONGODB_CONNECTION_STRING"</span>` with your actual MongoDB Atlas connection URI (e.g., `<span class="selected">mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/urlshortener?retryWrites=true&w=majority</span>`).

**Run the Backend Server:**

```
npm start
# or
node index.js

```

**The backend server will run on **`<span class="selected">http://localhost:3000</span>`. You should see `<span class="selected">DB connect sucesfully</span>` and `<span class="selected">Server running</span>` in your console.

### 3. Frontend Setup

**Open a new terminal, navigate back to the root directory of the project, and then into the **`<span class="selected">frontend</span>` directory:

```
cd ..
cd frontend

```

**Install Dependencies:**

```
npm install
# or
yarn install

```

**Run the Frontend Development Server:**

```
npm run dev
# or
yarn dev

```

**The frontend application will typically run on **`<span class="selected">http://localhost:5173</span>` (or another available port). Your browser should automatically open to this address.

## Usage

1. **Enter Original URL** **: In the input field, paste or type the long URL you want to shorten.**
2. **Shorten** **: Click the "Shorten" button.**
3. **View Short URL** **: The generated short URL will appear below the input field.**
4. **Copy** **: Click the "Copy" button to copy the short URL to your clipboard.**
5. **Redirect** **: Click the "Redirect" button or the short URL link to open the original URL in a new tab.**

## API Endpoints

### `<span class="selected">POST /api/short</span>`

* **Description** **: Creates a new short URL for a given original URL.**
* **Request Body** **:**

```
  {
      "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening"
  }

```

* **Response (Success)** **:**

```
  {
      "messg": "URL generated",
      "url": {
          "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
          "shortUrl": "randomId",
          "clicks": 0,
          "_id": "60c72b2f9b1e8b001c8e4d7a",
          "__v": 0
      }
  }

```

* **Response (Error)** **:**

```
  {
      "messg": "original url required"
  }

```

### `<span class="selected">GET /:shortUrl</span>`

* **Description** **: Redirects to the original URL associated with the given short URL and increments the click count.**
* **URL Parameters** **: **`<span class="selected">shortUrl</span>` (the 8-character short code)
* **Response (Success)** **: Redirects to the **`<span class="selected">originalUrl</span>`.
* **Response (Error)** **:**

```
  {
      "mssg": "url db mein nahi hai"
  }

```
