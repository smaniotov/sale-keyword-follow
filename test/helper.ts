import { createTestClient } from 'apollo-server-testing';
import { Collection } from 'mongodb';
import {
  CREATE_ALERT, DELETE_ALERT, GET_ALERT_BY_SEND_TO, GET_ALL_ALERTS, UPDATE_ALERT,
} from './queries';
import 'mocha';
import { mongoClient } from '../src/utils/db';
import initializeApolloServer from '../src/utils/initializeApolloServer';
import { CollectionEnum } from '../src/enums';
import { CreateAlertInputType, UpdateAlertInputType } from '../src/validators/Alert';

export const getAlertCollection = (): Collection => (
  mongoClient.db().collection(CollectionEnum.Alert)
);

export const clearCollection = async () => getAlertCollection().deleteMany({});

before(async () => {
  await mongoClient.connect();
});

export class NewAlertDataWrapper {
  public delay = 2;

  public sendTo = 'email.example@example.com';

  public passphrase = 'iPhone 10';

  build = () => ({
    delay: this.delay,
    sendTo: this.sendTo,
    passphrase: this.passphrase,
  });

  set = (item: string, value: any) => {
    this[item] = value;
    return this;
  };
}

const getTestClient = () => {
  const server = initializeApolloServer({ id: Date.now() });
  return createTestClient(server);
};

export const getCreateAlert = async () => {
  const { mutate } = getTestClient();
  return async (alert: CreateAlertInputType) => mutate({
    mutation: CREATE_ALERT,
    variables: { alert },
  });
};

export const getUpdateAlert = async () => {
  const { mutate } = getTestClient();

  return async (id: string, alert: UpdateAlertInputType) => mutate({
    mutation: UPDATE_ALERT,
    variables: { id, alert },
  });
};

export const getDeleteAlert = async () => {
  const { mutate } = getTestClient();
  return async (id) => mutate({ mutation: DELETE_ALERT, variables: { id } });
};

export const getAllAlertsMethod = async () => {
  const { query } = getTestClient();
  return async () => query({
    query: GET_ALL_ALERTS,
  });
};

export const getAlertBySendToMethod = async () => {
  const { query } = getTestClient();
  return async (sendTo: string) => query({
    query: GET_ALERT_BY_SEND_TO,
    variables: { sendTo },
  });
};

export const createAlertEntity = async (email: string, passphrase: string) => {
  const data = new NewAlertDataWrapper().set('sendTo', email).set('passphrase', passphrase).build();
  const createAlert = await getCreateAlert();
  return createAlert(data);
};

export const DEFAULT_TIMEOUT: number = 10000;
