import { Router } from "express";

export const tickerRouter = Router();

tickerRouter.get("/", (req, res) => {
    res.send("hi this get route")
})