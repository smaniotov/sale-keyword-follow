import { CronJob } from 'cron';
import addMinutes from 'date-fns/addMinutes';
import { ObjectID } from 'mongodb';
import { mongoClient } from '../utils/db';
import queue from './queue';
import { CollectionEnum } from '../enums';

export interface IAggregatedAlert {
  _id: number
  timeToSendFromNow: number
  delay: number
  name: string
  sendTo: string
  nextMessage: Date
  passphrase: string
}

const ONE_MINUTE_IN_MS = 60000;

const getNextMessageDate = (alert: IAggregatedAlert) => {
  if (alert.timeToSendFromNow > 0) return addMinutes(alert.nextMessage, alert.delay);
  return addMinutes(new Date(), alert.delay);
};

const aggregateQuery = () => ([
  { $match: { isActive: true } },
  { $addFields: { timeToSendFromNow: { $subtract: ['$nextMessage', new Date()] } } },
  {
    $project: {
      _id: 1, timeToSendFromNow: 1, delay: 1, name: 1, sendTo: 1, nextMessage: 1, passphrase: 1,
    },
  },
  { $match: { timeToSendFromNow: { $lt: ONE_MINUTE_IN_MS } } },
  { $sort: { timeToSendFromNow: 1 } },
]);

export default new CronJob('*/1 * * * * ', async () => {
  const alertCollection = mongoClient.db().collection(CollectionEnum.Alert);
  const alerts = await alertCollection.aggregate(aggregateQuery()).toArray();

  if (alerts.length > 0) {
    const redisResult = alerts.map((alert: IAggregatedAlert) => {
      const nextMessage = getNextMessageDate(alert);
      const { _id } = alert;
      const delay = Math.max(alert.timeToSendFromNow, 0);

      return Promise.all([
        queue.add(alert, { delay }),
        alertCollection
          .updateOne({ _id: new ObjectID(_id) },
            { $set: { nextMessage, updatedAt: new Date() } }),
      ]);
    });

    await Promise.all(redisResult);
  }
});
