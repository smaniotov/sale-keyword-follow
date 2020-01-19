import { CronJob } from 'cron';
import addMinutes from 'date-fns/addMinutes';

import { mongoClient } from '../utils/db';
import queue from './queue';

export interface IAggregatedAlert {
  _id: number
  timeToSendFromNow: number
  delay: number
  name: string
  sendTo: string
  nextMessage: Date
  passphrase: string
}

const getNextMessageDate = (alert: IAggregatedAlert) => {
  if (alert.timeToSendFromNow > 0) return addMinutes(alert.nextMessage, alert.delay);
  return addMinutes(new Date(), alert.delay);
};

export default new CronJob('*/10 * * * * * ', async () => {
  const alerts = await mongoClient.db().collection('Alert').aggregate([
    { $match: { isActive: true } },
    { $addFields: { timeToSendFromNow: { $subtract: ['$nextMessage', new Date()] } } },
    {
      $project: {
        _id: 1, timeToSendFromNow: 1, delay: 1, name: 1, sendTo: 1, nextMessage: 1, passphrase: 1,
      },
    },
    { $match: { timeToSendFromNow: { $lt: 60000 } } },
    { $sort: { timeToSendFromNow: 1 } },
  ]).toArray();

  console.log({ alerts });

  if (alerts.length > 0) {
    const redisResult = alerts.map((alert: IAggregatedAlert) => {
      const nextMessage = getNextMessageDate(alert);
      const { _id } = alert;
      return Promise.all([
        queue.add(alert, { delay: Math.max(alert.timeToSendFromNow, 0) }),
        mongoClient.db().collection('Alert').updateOne({ _id }, { $set: { nextMessage } }),
      ]);
    });

    const resolvedResult = await Promise.all(redisResult);
    console.log({ resolvedResult });
  }
});
