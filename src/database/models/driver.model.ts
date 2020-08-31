import { DataTypes, FindOptions, Model, ModelCtor, Sequelize } from 'sequelize';
import { BaseModel } from './base';

// defining properties for our User model
export interface IDriver {
  id_driver: number;
  idazien: number;
  cod_driver: number;
  idext: string;
  nickname: string;
  nome: string;
  cognome: string;
  email: string;
  cod_auth: string;
  gcm_regid: string;
  mytimes_regid: string;
  imei: string;
  mytimes_imei: string;
  enable_mokers: number;
  enable_mytimes: number;
  app_version: string;
  mytimes_app_version: string;
}

export class Driver extends BaseModel implements IDriver {
  public static readonly ModelName: string = 'Driver';
  public static readonly ModelNamePlural: string = 'Drivers';
  public static readonly TableName: string = 'list_driver';
  public static readonly DefaultScope: FindOptions = {};

  public id_driver: number;
  public idazien: number;
  public cod_driver: number;
  public idext: string;
  public nickname: string;
  public nome: string;
  public cognome: string;
  public email: string;
  public cod_auth: string;
  public gcm_regid: string;
  public mytimes_regid: string;
  public imei: string;
  public mytimes_imei: string;
  public enable_mokers: number;
  public enable_mytimes: number;
  public app_version: string;
  public mytimes_app_version: string;

  // region Static
  public static prepareInit(sequelize: Sequelize): void {
    this.init(
      {
        id_driver: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
          comment: 'autoincrement ID',
        },
        idazien: new DataTypes.NUMBER(),
        cod_driver: new DataTypes.NUMBER(),
        idext: new DataTypes.STRING(255),
        nickname: new DataTypes.STRING(255),
        nome: new DataTypes.STRING(255),
        cognome: new DataTypes.STRING(255),
        email: new DataTypes.STRING(255),
        cod_auth: new DataTypes.STRING(255),
        gcm_regid: new DataTypes.STRING(255),
        mytimes_regid: new DataTypes.STRING(255),
        imei: new DataTypes.STRING(255),
        mytimes_imei: new DataTypes.STRING(255),
        enable_mokers: new DataTypes.NUMBER(),
        enable_mytimes: new DataTypes.NUMBER(),
        app_version: new DataTypes.STRING(255),
        mytimes_app_version: new DataTypes.STRING(255),
      },
      {
        sequelize: sequelize,
        tableName: this.TableName,
        name: {
          singular: this.ModelName,
          plural: this.ModelNamePlural,
        },
        defaultScope: this.DefaultScope,
        comment: 'Model for the <list_driver> table',
        timestamps: false, //if false, no createdAt OR updatedAt columns are managed by sequelize
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static setAssociations(_modelCtors: {
    [modelName: string]: ModelCtor<Model>;
  }): void {
    // place to set model associations
  }
}
