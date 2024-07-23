import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER } from "../types";

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
    return res.json(response)
})