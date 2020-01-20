import { Job } from 'bull';
import get from 'lodash/get';
import nodeMailer from 'nodemailer';
import queue from './queue';
import ebay, { normalizeSales } from '../utils/Ebay';
import { IAggregatedAlert } from './TaskScheduler';

const {
  EMAIL_ADDRESS = '',
} = process.env;

export default class TaskManager {
  static start(transporterData: any) {
    queue.process(async (job: Job<IAggregatedAlert>) => {
      try {
        const alert: IAggregatedAlert = job.data;
        const data = await ebay.findItemsByKeywords({
          keywords: alert.keyword,
          sortOrder: 'PricePlusShippingLowest',
          entriesPerPage: 3,
        });
        const searchResult = get(data, '[0].searchResult[0]');

        if (searchResult) {
          const emailData = normalizeSales(searchResult);
          const transporter = nodeMailer.createTransport(transporterData);

          const mailOptions = {
            from: EMAIL_ADDRESS,
            to: alert.sendTo,
            subject: `Periodic Ebay Alert - ${alert.keyword}`,
            text: `The top sales for your search "${alert.keyword}":\n`
              + `${emailData.map((item, index) => `${index + 1}.\nTitle: ${item.title} \nURL: ${item.URL} \nPrice: USD $${item.price}\n`).join('\n')}`,
          };
          const sentEmail = await transporter.sendMail(mailOptions);
          console.log({ sentEmail, currentTime: new Date() });
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
