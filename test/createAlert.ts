import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getCreateAlert,
  NewAlertDataWrapper,
} from './helper';
import { initializeIndexes } from '../src/utils/db';

should();

describe('Create alert', async () => {
  const newAlertData1 = new NewAlertDataWrapper().build();
  const newAlertData2 = new NewAlertDataWrapper().set('sendTo', 'example2@example.com').build();

  before(async () => {
    await clearCollection();
  });

  beforeEach(async () => {
    await initializeIndexes();
  });

  afterEach(async () => {
    await clearCollection();
  });

  it('Create multiple alerts', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const createAlert = await getCreateAlert();
    const result1 = await createAlert(newAlertData1);
    const result2 = await createAlert(newAlertData2);

    result1.should.have.property('data').with.property('createAlert').equal('Ok');
    result2.should.have.property('data').with.property('createAlert').equal('Ok');
  });

  it('Create alert', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const createAlert = await getCreateAlert();
    const result = await createAlert(newAlertData1);
    result.should.have.property('data').with.property('createAlert').equal('Ok');
  });

  it('Create same alert twice', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const createAlert = await getCreateAlert();
    const result1 = await createAlert(newAlertData1);
    const result2 = await createAlert(newAlertData1);

    result1.should.have.property('data').with.property('createAlert').equal('Ok');
    result2.should.have.property('errors').with.property('0').with.property('statusCode').equal(400);
  });

  it('Create with wrong value', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const alertDataWithInvalidDelay = { ...newAlertData1, delay: 6 };
    const createAlert = await getCreateAlert();
    const result = await createAlert(alertDataWithInvalidDelay);

    result.should.have.property('errors').with.property('0').with.property('statusCode').equal(400);
  });

  // TODO: refactor to work better and faster
  // it('Check if the alert is being added in queue', async function (done) {
  //   TaskScheduler.start();
  //   this.timeout(150000);
  //   const createAlert = await getCreateAlert();
  //   await createAlert(newAlertData1);
  //   const properties = ['delay', 'sendTo', 'passphrase'];
  //
  //   await queue.process(async (job: Job) => {
  //     try {
  //       assert.deepEqual(pick(job.data, properties), pick(newAlertData1, properties));
  //       done();
  //     } catch (e) {
  //       done(e);
  //     }
  //   });
  // });
});
