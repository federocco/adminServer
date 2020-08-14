import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
import { config } from 'node-config-ts';

import { modelsLoader } from './models';

class Database {
  public readonly modelCtors;
  private readonly _sequelize: Sequelize = null;
  constructor(initModelCtors) {
    // get database config
    const {
      database: { database, username, password, dialect, host },
    } = config;

    this.modelCtors = initModelCtors;

    this._sequelize = new Sequelize(database, username, password, {
      dialect: dialect as Dialect,
      host,
    });

    // init every model
    Object.keys(this.modelCtors).forEach((modelName) => {
      this.modelCtors[modelName].prepareInit(this._sequelize);
    });

    // call (create) associations for each model
    Object.keys(this.modelCtors).forEach((modelName) => {
      this.modelCtors[modelName].setAssociations(this.modelCtors);
    });
  }

  /**
   * connect & authenticate with the database
   * */
  public async prepare() {
    try {
      // return await to catch error if thrown
      return await this._sequelize.authenticate();
      // do not sync otherwise current data in database will be emptied out (Dropping all tables and recreating them)
      // return await this._sequelize.sync();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * export the sequelize object
   * */
  public get Sequelize() {
    return this._sequelize;
  }
}

export const getDatabase = async (): Promise<Database> => {
  const initModelCtors = await modelsLoader();
  const database = new Database(initModelCtors);
  await database.prepare();
  return database;
};
