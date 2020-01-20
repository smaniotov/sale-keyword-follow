import { should } from 'chai';
import 'mocha';
import get from 'lodash/get';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  createAlertEntity, getAllAlertsMethod, getUpdateAlert,
} from './helper';
import { initializeIndexes } from '../src/utils/db';

should();

describe('Update alert', async () => {
  const email = 'email@example.com';
  const keyword = 'iphone 1';

  beforeEach(async () => {
    await clearCollection();
    await initializeIndexes();
    await createAlertEntity(email, keyword);
  });

  after(async () => {
    await clearCollection();
  });

  it('Update an alert values', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const getAllAlerts = await getAllAlertsMethod();
    const alerts = await getAllAlerts();

    alerts.should.have.property('data')
      .with.property('getAllAlerts').with.property('0').with.property('delay').equals(2);

    const updateAlert = await getUpdateAlert();
    const result = await updateAlert(get(alerts, 'data.getAllAlerts[0]._id'), { delay: 5 });

    result.should.have.property('data').with.property('updateAlert').equals('Ok');

    const alertstAfterUpdate = await getAllAlerts();

    alertstAfterUpdate.should.have.property('data')
      .with.property('getAllAlerts').with.property('0').with.property('delay').equals(5);
  });
});
