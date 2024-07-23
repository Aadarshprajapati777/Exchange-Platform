import { Router } from "express";

export const depthRouter = Router();

depthRouter.get("/", (req,res) => {
    res.send("this is depth route")
})