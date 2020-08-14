import { DataTypes, FindOptions, Model, ModelCtor, Sequelize } from 'sequelize';
import { BaseModel } from './base';

// defining properties for our User model
export interface IUser {
  nome: string;
  pass: string;
  idutente: number;
  type_user: string;
  idazien: number;
  email_user: string;
  lastNormalLogin: Date;
}

export class User extends BaseModel implements IUser {
  public static readonly ModelName: string = 'User';
  public static readonly ModelNamePlural: string = 'Users';
  public static readonly TableName: string = 'utenti';
  public static readonly DefaultScope: FindOptions = {};

  public idutente: number;
  public type_user: string;
  public idazien: number;
  public nome: string;
  public pass: string;
  public email_user: string;
  public lastNormalLogin: Date;

  // region Static
  public static prepareInit(sequelize: Sequelize): void {
    this.init(
      {
        idutente: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
          comment: 'autoincrement ID',
        },
        type_user: new DataTypes.STRING(255),
        idazien: new DataTypes.NUMBER(),
        nome: new DataTypes.STRING(255),
        pass: new DataTypes.STRING(255),
        email_user: new DataTypes.STRING(255),
        lastNormalLogin: new DataTypes.DATE(),
      },
      {
        sequelize: sequelize,
        tableName: this.TableName,
        name: {
          singular: this.ModelName,
          plural: this.ModelNamePlural,
        },
        defaultScope: this.DefaultScope,
        comment: 'Model for the <utenti> table',
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
