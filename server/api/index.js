import express, { Router, json } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import morgan from "morgan";
const apiRoutes = Router();
dotenv.config();

const app = express();

// MS- All route imports
import verificationRoutes from "./routes/verificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";

// Middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));

// API Routes
apiRoutes.use("/verification", verificationRoutes);
apiRoutes.use("/user", userRoutes);
apiRoutes.use("/news", newsRoutes);
apiRoutes.use("/feeds", feedRoutes);

app.use("/api", apiRoutes);

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

