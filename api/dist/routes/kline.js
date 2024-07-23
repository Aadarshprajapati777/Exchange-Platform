"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.klineRouter = void 0;
const express_1 = require("express");
exports.klineRouter = (0, express_1.Router)();
exports.klineRouter.get("/", (req, res) => {
    res.send("thi is kline route");
});
