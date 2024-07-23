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
exports.orderRouter = void 0;
const express_1 = require("express");
const RedisManager_1 = require("../RedisManager");
const types_1 = require("../types");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { market, price, side, quantity, userID } = req.body;
    console.log({ market, side, quantity, userID, price });
    //send it to redis queue and subscribe to pubsub
    const response = yield RedisManager_1.RedisManager.getInstance().sendToQueueAndPubSub({
        type: types_1.CREATE_ORDER,
        data: {
            market,
            side,
            quantity,
            userID,
            price
        }
    });
    return res.json(response.payload);
}));
exports.orderRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID, market } = req.body;
    const response = yield RedisManager_1.RedisManager.getInstance().sendToQueueAndPubSub({
        type: types_1.CANCEL_ORDER,
        data: {
            orderID,
            market
        }
    });
    return res.json(response.payload);
}));
exports.orderRouter.get("/open", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield RedisManager_1.RedisManager.getInstance().sendToQueueAndPubSub({
        type: types_1.GET_OPEN_ORDER,
        data: {
            userID: req.query.userID,
            market: req.query.market
        }
    });
    return res.json(response.payload);
}));
