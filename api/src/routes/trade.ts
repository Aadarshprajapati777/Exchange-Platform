import { Router } from "express";

export const tradeRouter = Router();

tradeRouter.get("/", (req,res) => {
    res.send("this is trade route");
})