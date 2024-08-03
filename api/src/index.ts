import express from "express";
import cors from "cors";
import 'dotenv/config'

import { tickerRouter } from "./routes/ticker";
import { orderRouter } from "./routes/order";
import { tradeRouter } from "./routes/trade";
import { klineRouter } from "./routes/kline";
import { depthRouter } from "./routes/depth";

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json())


//routing
app.use("/api/v1/ticker", tickerRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/trade", tradeRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/klines", klineRouter);



app.listen(port, () => {
    console.log("server is running at post "+ port)
})