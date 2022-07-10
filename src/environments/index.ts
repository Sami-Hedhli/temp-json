import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

const PORT: number = +process.env.PORT || 3000;

const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;

const DOMAIN: string = process.env.DOMAIN || 'localhost';

// mongodb
const MONGOATLAS_USER = process.env.MONGOATLAS_USER || 'admin';
const MONGOATLAS_PASS = process.env.MONGOATLAS_PASS || 'RvLWZaauBio9RFy6';
const MONGOATLAS_HOST =
  process.env.MONGOATLAS_HOST || 'cluster0.eumi6.mongodb.net';
const MONGOATLAS_DATABASE = process.env.MONGOATLAS_DATABASE || 'TempJson';
const MONGOATLAS_URL = `mongodb+srv://${MONGOATLAS_USER}:${MONGOATLAS_PASS}@${MONGOATLAS_HOST}`;

// bcrypt
const BCRYPT_SALT = +process.env.BCRYPT_SALT || 10;

export {
  NODE_ENV,
  PORT,
  RATE_LIMIT_MAX,
  MONGOATLAS_URL,
  DOMAIN,
  MONGOATLAS_DATABASE,
  BCRYPT_SALT,
};
