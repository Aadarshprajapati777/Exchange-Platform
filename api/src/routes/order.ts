import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CANCEL_ORDER, CREATE_ORDER, GET_OPEN_ORDER } from "../types";

export const orderRouter = Router();

orderRouter.post("/", async (req,res) => {
    const {market, price, side, quantity, userID} = req.body;
    console.log({market, side, quantity, userID, price});

    //send it to redis queue and subscribe to pubsub
    const response = await RedisManager.getInstance().sendToQueueAndPubSub({
        type: CREATE_ORDER,
        data: {
            market,
            side,
            quantity,
            userID,
            price
        }
    })
    return res.json(response.payload)
})

orderRouter.delete("/", async (req,res) => {
    const {orderID, market} = req.body;
    const response = await RedisManager.getInstance().sendToQueueAndPubSub({
        type: CANCEL_ORDER,
        data: {
            orderID,
            market
        }
    })
    return res.json(response.payload);
})

orderRouter.get("/open", async (req,res) => {
    console.log("req.query arsh: ", req.query.userId, req.query.market);
    const response = await RedisManager.getInstance().sendToQueueAndPubSub({
        type: GET_OPEN_ORDER,
        data: {
            userID: req.query.userId as string,
            market: req.query.market as string
        }
    })
    return res.json(response.payload);
})