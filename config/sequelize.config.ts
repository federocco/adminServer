import * as dotenv from 'dotenv';
dotenv.config();
import { config } from 'node-config-ts';

console.log('This is the current loaded configuration object: ', config);

module.exports = {
  development: { ...config.database },
  production: { ...config.database },
};
