// app.js

import express from "express";
import goodsRouter from "./routes/goods.js";
import connect from "./schemas/index.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", [goodsRouter]);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT, "포트로 서버가 열렸어요!");
});
