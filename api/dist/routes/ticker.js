"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickerRouter = void 0;
const express_1 = require("express");
exports.tickerRouter = (0, express_1.Router)();
exports.tickerRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //send array of json as res
    res.json([{ "firstPrice": "95.44", "high": "95.44", "lastPrice": "94.86", "low": "94.86", "priceChange": "-0.58", "priceChangePercent": "-0.006077", "quoteVolume": "26.05312", "symbol": "AAVE_USDC", "trades": "3", "volume": "0.274" }, { "firstPrice": "0.2083", "high": "0.2196", "lastPrice": "0.2117", "low": "0.2083", "priceChange": "0.0034", "priceChangePercent": "0.016323", "quoteVolume": "370.925083", "symbol": "BLUR_USDC", "trades": "12", "volume": "1725.74" }, { "firstPrice": "0.0092", "high": "0.0198", "lastPrice": "0.0091", "low": "0.0011", "priceChange": "-0.0001", "priceChangePercent": "-0.01087", "quoteVolume": "44804.37371", "symbol": "BODEN_USDC", "trades": "355", "volume": "4915510.58" }, { "firstPrice": "0.009489", "high": "0.009547", "lastPrice": "0.009307", "low": "0.009052", "priceChange": "-0.000182", "priceChangePercent": "-0.01918", "quoteVolume": "1354.9978402", "symbol": "BOME_USDC", "trades": "20", "volume": "145235.8" }]);
}));
exports.tickerRouter.post("/", (req, res) => {
    res.send("hi this get route");
});
exports.tickerRouter.delete("/", (req, res) => {
    res.send("hi this get route");
});
