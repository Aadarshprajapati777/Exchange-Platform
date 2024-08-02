const { Client } = require('pg');

const client = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});

async function initializeDB() {
    await client.connect();

    // Drop and create table
    await client.query(`
        DROP TABLE IF EXISTS "tata_prices" CASCADE;
        CREATE TABLE "tata_prices"(
            time            TIMESTAMP WITH TIME ZONE NOT NULL,
            open   DOUBLE PRECISION,
            high   DOUBLE PRECISION,
            low    DOUBLE PRECISION,
            close  DOUBLE PRECISION,
            volume DOUBLE PRECISION,
            currency_code   VARCHAR (10)
        );
        
        SELECT create_hypertable('tata_prices', 'time', 'open', 2);
    `);

    // Create materialized views
    await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1m AS
        SELECT
            time_bucket('1 minute', time) AS bucket,
            first(open, time) AS open,
            max(high) AS high,
            min(low) AS low,
            last(close, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM tata_prices
        GROUP BY bucket, currency_code;
    `);

    await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1h AS
        SELECT
            time_bucket('1 hour', time) AS bucket,
            first(open, time) AS open,
            max(high) AS high,
            min(low) AS low,
            last(close, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM tata_prices
        GROUP BY bucket, currency_code;
    `);

    await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1w AS
        SELECT
            time_bucket('1 week', time) AS bucket,
            first(open, time) AS open,
            max(high) AS high,
            min(low) AS low,
            last(close, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM tata_prices
        GROUP BY bucket, currency_code;
    `);

    // Insert realistic dummy data for the past week
    const oneWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const now = new Date();
    const bucketDuration = 1000 * 60 * 60; // 1 hour in milliseconds

    // Convert dates to milliseconds for arithmetic operations
    const oneWeekAgoMs = oneWeekAgo.getTime();
    const nowMs = now.getTime();
    
    // Calculate number of buckets
    const numBuckets = Math.ceil((nowMs - oneWeekAgoMs) / bucketDuration);
    
    const dummyData = [];
    
    for (let i = 0; i < numBuckets; i++) {
        const bucketStartTime = new Date(oneWeekAgoMs + i * bucketDuration);
        
        // Generate multiple data points per bucket
        for (let j = 0; j < 10; j++) { // 10 points per hour
            const randomOffset = Math.random() * bucketDuration;
            const pointTime = new Date(bucketStartTime.getTime() + randomOffset);
            
            const basePrice = 50 + (Math.random() - 0.5) * 10; // Base price with small fluctuation
            const priceFluctuation = 1 + Math.random() * 2; // Max fluctuation for high and low prices
            const volume = (Math.random() * 1000).toFixed(2);
            
            const openPrice = (basePrice + (Math.random() - 0.5) * priceFluctuation).toFixed(2);
            const highPrice = (parseFloat(openPrice) + Math.random() * priceFluctuation).toFixed(2);
            const lowPrice = (parseFloat(openPrice) - Math.random() * priceFluctuation).toFixed(2);
            const closePrice = (parseFloat(lowPrice) + Math.random() * (parseFloat(highPrice) - parseFloat(lowPrice))).toFixed(2);
            
            // Ensure high >= open >= low and close is varied
            dummyData.push({
                time: pointTime,
                open: parseFloat(openPrice),
                high: parseFloat(highPrice),
                low: parseFloat(lowPrice),
                close: parseFloat(closePrice),
                volume: volume,
                currency_code: 'USD'
            });
        }
    }

    await Promise.all(dummyData.map(data =>
        client.query(`
            INSERT INTO tata_prices (time, open, high, low, close, volume, currency_code)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [data.time, data.open, data.high, data.low, data.close, data.volume, data.currency_code])
    ));

    // Refresh materialized views
    await client.query(`REFRESH MATERIALIZED VIEW klines_1m;`);
    await client.query(`REFRESH MATERIALIZED VIEW klines_1h;`);
    await client.query(`REFRESH MATERIALIZED VIEW klines_1w;`);

    await client.end();
    console.log("Database initialized and seeded with diverse dummy data successfully");
}

initializeDB().catch(console.error);
