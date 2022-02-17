const { Queue } = require('bullmq');
const config = require('config');
const IORedis = require('ioredis');

const connection = new IORedis(config.redis, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
});

const myQueue = new Queue('foo', {connection});

async function addJobs() {
    const job = await myQueue.add('myJobName', { foo: 'bar' });
    console.log('job id:', job.id);
    process.exit(0);
}

(addJobs)();
