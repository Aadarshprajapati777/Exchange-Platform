import { Client } from 'pg';
import { Router } from "express";
import { RedisManager } from "../RedisManager";

const pgClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
pgClient.connect();

export const klineRouter = Router();

klineRouter.get("/", async (req, res) => {
    const { interval, startTime, endTime } = req.query;
    const market = "TATA_INR";
    console.log("market: ", market);
    console.log("interval: ", interval);
    console.log("startTime: ", startTime);
    console.log("endTime: ", endTime);
    if (!market || !interval || !startTime || !endTime) {
        return res.status(400).send('Invalid query params');
    }   

    let query;
    switch (interval) {
        case '1m':
            query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
            break;
        case '1h':
            query = `SELECT * FROM klines_1h WHERE  bucket >= $1 AND bucket <= $2 LIMIT 50`;
            break;
        case '1w':
            query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`;
            break;
        default:
            return res.status(400).send('Invalid interval');
    }

    try {

        //@ts-ignore
        const result = await pgClient.query(query, [(new Date (Number(startTime) * 1000 ) as unknown as string), (new Date (Number(endTime) * 1000 ) as unknown as string)]);
        console.log("result: ", result);
        res.json(result.rows.map(x => ({
            close: x.close,
            end: x.bucket,
            high: x.high,
            low: x.low,
            open: x.open,
            quoteVolume: x.quoteVolume,
            start: x.start,
            trades: x.trades,
            volume: x.volume,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});