import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares

app.use(express.json()); // mục đích parse JSON body từ client gửi lên

//public routes
app.use('/api/auth', authRoute)

// private routes

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server chạy trên port ${PORT}`);
    });
  } catch (error) {
    console.error("Không thể start server:", error);
    process.exit(1);
  }
};
startServer();