import axios from "axios";
import { Ticker } from "./types";

const BASE_URL = "http://localhost:3000/api/v1";

export async function getTicket(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if(!ticker){
        throw new Error (`no ticker found for the market ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
    const response = await axios.get(`${BASE_URL}/ticker`);
    return response.data;
}