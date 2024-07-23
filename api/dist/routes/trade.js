"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeRouter = void 0;
const express_1 = require("express");
exports.tradeRouter = (0, express_1.Router)();
exports.tradeRouter.get("/", (req, res) => {
    res.send("this is trade route");
});
