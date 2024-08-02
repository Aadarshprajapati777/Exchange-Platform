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
const redis_1 = require("redis");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in main function");
        const redisClient = (0, redis_1.createClient)();
        const response = yield redisClient.connect();
        if (!response) {
            throw new Error("Failed to connect to Redis");
        }
        else {
            console.log("connected to redis");
        }
    });
}
main();
