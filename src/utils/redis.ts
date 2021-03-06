import redis from 'redis';

export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST, // use 'redis' if using docker-compose
  port: Number(process.env.REDIS_PORT),
  no_ready_check: true,
  detect_buffers: true
});

redisClient.on('connect', () => console.log('App is connected to redis.'));

redisClient.on('error', error =>
  console.log(`Unable to connect to redis: ${error}.`)
);

