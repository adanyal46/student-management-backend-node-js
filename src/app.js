const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());


// Define your routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Use the global error handler (should be the last middleware)
app.use(errorHandler);
module.exports = app;
