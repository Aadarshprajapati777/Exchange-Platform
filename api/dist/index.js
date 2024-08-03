"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const ticker_1 = require("./routes/ticker");
const order_1 = require("./routes/order");
const trade_1 = require("./routes/trade");
const kline_1 = require("./routes/kline");
const depth_1 = require("./routes/depth");
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routing
app.use("/api/v1/ticker", ticker_1.tickerRouter);
app.use("/api/v1/order", order_1.orderRouter);
app.use("/api/v1/trade", trade_1.tradeRouter);
app.use("/api/v1/depth", depth_1.depthRouter);
app.use("/api/v1/klines", kline_1.klineRouter);
app.listen(port, () => {
    console.log("server is running at post " + port);
});
