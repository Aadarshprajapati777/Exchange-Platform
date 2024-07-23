import { createClient, RedisClientType } from "redis";
import { OrderData } from "./types/CustomTypes";
import { ResponseFromOrderbook } from "./types";

export class RedisManager {
    private pubsubClient : RedisClientType;
    private queuePublisher : RedisClientType;
    private static instance : RedisManager;

    private constructor(){
        this.pubsubClient = createClient();
        this.pubsubClient.connect();
        this.queuePublisher = createClient();
        this.queuePublisher.connect();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisManager();
        }
        return this.instance;
    }

    public sendToQueueAndPubSub(data: OrderData){
        return new Promise<ResponseFromOrderbook>((resolve) => {
            const id = this.createRandomClientID();

            //first subsubribe to pubsub with the id and wait for the published message. Once published message received for that id,
            //unsubscibe to allow other ids to subscribe.

            this.pubsubClient.subscribe(id, (message) => {
                this.pubsubClient.unsubscribe(id);
                resolve(JSON.parse(message));
            })
            this.queuePublisher.lPush("data", JSON.stringify({clientID: id, data}));
        })
    }
    
    public createRandomClientID(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

