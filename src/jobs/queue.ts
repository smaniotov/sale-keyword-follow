import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

const { REDIS_URL = '' } = process.env;

export default new Queue('alert_queue', REDIS_URL);
