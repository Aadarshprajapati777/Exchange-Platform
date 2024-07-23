import axios from "axios";
import { Ticker } from "./types";

const BASE_URL = "http://localhost:3000/api/v1";


export async function getTickers(): Promise<Ticker[]> {
    const response = await axios.get(`${BASE_URL}/ticker`);
    return response.data;
}