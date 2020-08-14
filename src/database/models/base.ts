import { Model, ModelCtor, Sequelize, FindOptions } from 'sequelize';

// /**
//  * Abstract class to be extended by models
//  * declares the default structure of a model
//  * */
export abstract class BaseModel extends Model {
  public static readonly ModelName: string;
  public static readonly ModelNamePlural: string;
  public static readonly TableName: string;
  public static readonly DefaultScope: FindOptions = {};

  //   /**
  //    * Method to initialize the model
  //    * */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static prepareInit(_sequelize: Sequelize): void {
    throw new Error('prepareInit not implemented');
  }

  //   /**
  //    * Method to set all needed associations for the model
  //    **/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static setAssociations(_modelCtors: {
    [modelName: string]: ModelCtor<BaseModel>;
  }): void {
    throw new Error('setAssociations not implemented');
  }
}
