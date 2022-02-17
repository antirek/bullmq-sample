const { Worker } = require('bullmq');
const config = require('config');
const IORedis = require('ioredis');

const connection = new IORedis(config.redis, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false, 
    retryStrategy(times) {
        console.log('retry', times);        
        return 2000;
    },
});

const myWorker = new Worker('foo', async (job) => {
    console.log('job', job.name, job.id, job.data);
}, { connection });