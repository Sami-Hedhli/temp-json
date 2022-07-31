import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV;

const PORT: number = +process.env.PORT;

const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX;

const DOMAIN: string = process.env.DOMAIN;

// mongodb

const MONGOATLAS_DATABASE = process.env.MONGOATLAS_DATABASE;
const MONGOATLAS_URL = process.env.MONGOATLAS_URL;

// bcrypt
const BCRYPT_SALT = +process.env.BCRYPT_SALT;
const JWT_SECRET = process.env.JWT_SECRET;

export {
  NODE_ENV,
  PORT,
  RATE_LIMIT_MAX,
  MONGOATLAS_URL,
  DOMAIN,
  MONGOATLAS_DATABASE,
  BCRYPT_SALT,
  JWT_SECRET,
};
