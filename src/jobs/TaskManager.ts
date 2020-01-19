import { Job } from 'bull';
import get from 'lodash/get';
import nodeMailer from 'nodemailer';
import queue from './queue';
import ebay from '../utils/Ebay';
import { IAggregatedAlert } from './TaskScheduler';
import env from '../utils/env';

const {
  EMAIL_ADDRESS = '',
  EMAIL_PASSWORD = '',
} = env.parsed || {};

export default class TaskManager {
  static start() {
    queue.process(async (job: Job<IAggregatedAlert>) => {
      try {
        const alert: IAggregatedAlert = job.data;
        const data = await ebay.findItemsByKeywords({
          keywords: alert.passphrase,
          sortOrder: 'PricePlusShippingLowest',
          entriesPerPage: 3,
        });
        const searchResult = get(data, '[0].searchResult[0]');

        if (searchResult) {
          const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: EMAIL_ADDRESS,
              pass: EMAIL_PASSWORD,
            },
            debug: true,
            logger: true,
          } as any);

          const mailOptions = {
            from: EMAIL_ADDRESS,
            to: alert.sendTo,
            subject: 'Periodic Ebay sales',
            text: `The best sales choices for your search "${alert.passphrase}" is: \n ${JSON.stringify(searchResult)}`,
          };
          const a = await transporter.sendMail(mailOptions);
          console.log(a);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
