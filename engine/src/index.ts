import {createClient} from "redis";

async function main(){
    console.log("in main function")
    const redisClient = createClient();
    const response = await redisClient.connect();
    if( !response){
        throw new Error("Failed to connect to Redis");
    } else {
        console.log("connected to redis");
    }
}

main();
