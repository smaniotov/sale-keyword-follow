import Ebay from 'ebay-node-api';
import env from './env';

const { EBAY_CLIENT_ID = '', EBAY_CLIENT_SECRET, EBAY_ENV = 'sandbox' } = env.parsed as any;

export default new Ebay({
  clientID: EBAY_CLIENT_ID,
  clientSecret: EBAY_CLIENT_SECRET,
  env: EBAY_ENV,
});
