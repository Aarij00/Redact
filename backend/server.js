import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import hrRoutes from "./routes/hr.route.js";

import internalRoutes from "./routes/internal.route.js";

import connectMongoDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(cookieParser());




// routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/hr", hrRoutes);

app.use('/api/internal', internalRoutes); // internal Node to Flask





app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
