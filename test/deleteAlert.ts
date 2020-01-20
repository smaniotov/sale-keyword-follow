import { should } from 'chai';
import 'mocha';
import get from 'lodash/get';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getDeleteAlert,
  getCreateAlert,
  getAllAlertsMethod,
  NewAlertDataWrapper,
} from './helper';

should();

describe('Delete alert', async () => {
  const newAlertData1 = new NewAlertDataWrapper().build();

  before(async () => clearCollection());

  after(async () => clearCollection());

  it('Delete alert by id', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const createAlert = await getCreateAlert();
    await createAlert(newAlertData1);
    const getAllAlerts = await getAllAlertsMethod();
    const alerts = await getAllAlerts();
    const deleteAlert = await getDeleteAlert();

    alerts.should.have.property('data').with.property('getAllAlerts').with.lengthOf(1);

    const result = await deleteAlert(get(alerts, 'data.getAllAlerts[0]._id'));

    result.should.have.property('data').with.property('deleteAlert').equals('Ok');
    const alertsAfterDelete = await getAllAlerts();

    alertsAfterDelete.should.have.property('data').with.property('getAllAlerts').with.lengthOf(0);
  });
});
