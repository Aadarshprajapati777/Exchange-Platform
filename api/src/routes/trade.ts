import { Router } from "express";

export const tradeRouter = Router();

tradeRouter.get("/", async (req,res) => {
    const { market } = req.query;
    //get the data from db 
    res.json({})
})