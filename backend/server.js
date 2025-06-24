import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initUserTable } from "./models/userModel.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('🚀 MediCare Server is running!');
});

// Connect to SQLite and start server
const start = async () => {
  await initUserTable();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
