import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getAllAlertsMethod,
  getAlertBySendToMethod,
  createAlertEntity,
  getAllertsPageMethod,
} from './helper';

should();

describe('Get alert', async () => {
  const email1 = 'email1@example.com';
  const email2 = 'email2@example.com';
  const getAlertPage = await getAllertsPageMethod();


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

  it('Get alerts first page ', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const result = await getAlertPage('', 0, 2);
    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(2);
    result.should.have.nested.property('data.getAlertsPage.count').equals(6);
    result.should.have.nested.property('data.getAlertsPage.data[0].keyword').equals('iphone 1');
    result.should.have.nested.property('data.getAlertsPage.data[1].keyword').equals('iphone 2');
  });

  it('Get alerts second page', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const result = await getAlertPage('', 1, 2);
    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(2);
    result.should.have.nested.property('data.getAlertsPage.count').equals(6);
    result.should.have.nested.property('data.getAlertsPage.data[0].keyword').equals('iphone 3');
    result.should.have.nested.property('data.getAlertsPage.data[1].keyword').equals('iphone 4');
  });

  it('Get alerts page with sendTo filter', async function () {
    this.timeout(DEFAULT_TIMEOUT);

    const result = await getAlertPage('email1', 0, 10);
    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(3);
    result.should.have.nested.property('data.getAlertsPage.count').equals(3);
    result.should.have.nested.property('data.getAlertsPage.data[0].keyword').equals('iphone 2');
    result.should.have.nested.property('data.getAlertsPage.data[1].keyword').equals('iphone 3');
    result.should.have.nested.property('data.getAlertsPage.data[2].keyword').equals('iphone 4');
  });

  it('Get alerts page with keyword filter', async function () {
    this.timeout(DEFAULT_TIMEOUT);

    const result = await getAlertPage('iphone', 0, 10);
    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(6);
    result.should.have.nested.property('data.getAlertsPage.count').equals(6);
    result.should.have.nested.property('data.getAlertsPage.data[0].keyword').equals('iphone 1');
    result.should.have.nested.property('data.getAlertsPage.data[5].keyword').equals('iphone 6');
  });

  it('Get alerts page with empty return', async function () {
    this.timeout(DEFAULT_TIMEOUT);

    const result = await getAlertPage('email200', 0, 10);
    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(0);
    result.should.have.nested.property('data.getAlertsPage.count').equals(0);
    result.should.not.have.nested.property('data.getAlertsPage.data[0].keyword');
  });

  it('Get alerts page with desc order', async function () {
    this.timeout(DEFAULT_TIMEOUT);

    const result = await getAlertPage('', 0, 10, -1);

    result.should.have.nested.property('data.getAlertsPage').with.keys('data', 'count');
    result.should.have.nested.property('data.getAlertsPage.data').with.lengthOf(6);
    result.should.have.nested.property('data.getAlertsPage.count').equals(6);
    result.should.have.nested.property('data.getAlertsPage.data[5].keyword').equals('iphone 1');
    result.should.have.nested.property('data.getAlertsPage.data[0].keyword').equals('iphone 6');
  });
});
