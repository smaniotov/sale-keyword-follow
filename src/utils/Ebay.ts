import Ebay from 'ebay-node-api';
import dotenv from 'dotenv';
import get from 'lodash/get';

dotenv.config();

const {
  EBAY_CLIENT_ID = '', EBAY_CLIENT_SECRET = '', EBAY_ENV = 'production',
} = process.env;

export const normalizeSales = (sales): any[] => {
  if (!sales) return [];
  return get(sales, 'item', []).reduce((out, item) => {
    const normalizedSale = {
      title: get(item, 'title', 'No title'),
      URL: get(item, 'viewItemURL[0]', 'https://www.ebay.com/'),
      price: get(item, 'sellingStatus[0].convertedCurrentPrice[0].__value__'),
    };
    out.push(normalizedSale);

    return out;
  }, []);
};

export default new Ebay({
  clientID: EBAY_CLIENT_ID,
  clientSecret: EBAY_CLIENT_SECRET,
  env: EBAY_ENV,
});
