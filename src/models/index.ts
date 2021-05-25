import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import path from 'path';
import { appEnv } from '../utils/helper'

const resolve = path.resolve;

dotenv.config({ path: resolve(appEnv()) });


export const sequelize = new Sequelize(String(process.env.APP_DB_DATABASE), String(process.env.APP_DB_USERNAME), String(process.env.APP_DB_PASSWORD), {
  host: String(process.env.APP_DB_HOST),
  dialect: 'mysql'
});
