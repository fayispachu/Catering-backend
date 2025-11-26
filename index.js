// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./database/DBConnection.js";
import UserRouter from "./routes/User.route.js";
import GalleryRouter from "./routes/Gallery.route.js";
import MenuRouter from "./routes/Menu.route.js";
import WorkRouter from "./routes/Work.route.js";
import WeddingRouter from "./routes/Wedding.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: [
      "https://canopuscatering.netlify.app/", // client URL
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Health check route (prevents Render from thinking the app is down)
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/user", UserRouter);
app.use("/api/menu", MenuRouter);
app.use("/api/gallery", GalleryRouter);
app.use("/api/work", WorkRouter);
app.use("/api/weddings", WeddingRouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

