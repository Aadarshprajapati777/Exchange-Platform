"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthRouter = void 0;
const express_1 = require("express");
exports.depthRouter = (0, express_1.Router)();
exports.depthRouter.get("/", (req, res) => {
    res.send("this is depth route");
});
