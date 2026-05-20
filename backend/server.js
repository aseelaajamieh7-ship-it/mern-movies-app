require("dotenv").config({
  path: "./.env",
});

const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const session = require("express-session");

const MongoStore = require("connect-mongo").default;


const authRoutes = require("./routes/authRoutes");

const movieRoutes = require("./routes/movieRoutes");


const app = express();


// CHECK ENV
console.log(process.env.MONGO_URI);


// CORS
app.use(
  cors({
    origin: "https://mern-movies-app2.onrender.com",
    credentials: true,
  })
);


// MIDDLEWARE
app.use(express.json());


// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,

      secure: true,

      sameSite: "none",
    },
  })
);


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);


// HOME ROUTE
app.get("/", (req, res) => {

  res.send("Server running");
});


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4,
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error:");
  console.log(err);
});


// SERVER
app.listen(5000, () => {

  console.log("Server running on port 5000");
});