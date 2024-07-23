import { Router } from "express";

export const klineRouter = Router();

klineRouter.get("/", (req,res) => {
    res.send("thi is kline route")
})