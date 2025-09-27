import express, { json } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

const app = express();

import indexRoutes from "./Routes/index.js";

// Middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));


app.use("/api", indexRoutes);
app.use(cors([]));

// Database connection
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

