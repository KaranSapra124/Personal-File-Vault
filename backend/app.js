import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", fileRoutes);

app.listen(3000, () => console.log("Listening on 3000"));