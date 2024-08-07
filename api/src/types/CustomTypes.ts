import { CANCEL_ORDER, CREATE_ORDER, GET_OPEN_ORDER, GET_DEPTH } from ".";

export type OrderData = {

    //order data can be of multiple types like cancel_order, post_order
    //market, price, quantity, side, userId

    type: typeof CREATE_ORDER,
    data:{
        market: string;
        quantity: number;
        side: "buy || sell";
        price: number;
        userID: string;
    } 
} | {
    type: typeof CANCEL_ORDER,
    data: {
        orderID: string,
        market: string
    }
} | {
    type: typeof GET_OPEN_ORDER,
    data: {
        userID: string,
        market: string
    }
} | {
    type: typeof GET_DEPTH,
    data: {
        market: string
    }
}