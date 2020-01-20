import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getAllAlertsMethod,
  getAlertBySendToMethod,
  createAlertEntity,
} from './helper';

should();

describe('Create alert', async () => {
  const email1 = 'email1@example.com';
  const email2 = 'email2@example.com';

  before(async () => {
    await clearCollection();

    await createAlertEntity(email2, 'iphone 1');
    await createAlertEntity(email1, 'iphone 2');
    await createAlertEntity(email1, 'iphone 3');
    await createAlertEntity(email1, 'iphone 4');
    await createAlertEntity(email2, 'iphone 5');
    await createAlertEntity(email2, 'iphone 6');
  });

  it('Get all alert by sendTo email', async function () {
    this.timeout(DEFAULT_TIMEOUT);

    const getAllBySendTo = await getAlertBySendToMethod();
    const result = await getAllBySendTo(email2);
    result.should.have.property('data').with.property('getAlertsBySendTo').with.lengthOf(3);
  });

  it('Get all alerts', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const getAllAlerts = await getAllAlertsMethod();
    const result = await getAllAlerts();

    result.should.have.property('data').with.property('getAllAlerts').with.lengthOf(6);
  });
});
