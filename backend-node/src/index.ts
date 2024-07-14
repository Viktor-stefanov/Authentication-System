import dotenv from "dotenv";
import express from "express";
import router from "./routes/auth.js";
import "./db/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
