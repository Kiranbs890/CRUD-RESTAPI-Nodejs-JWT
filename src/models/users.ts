import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

export default class UserModel extends Model {
  public id!: number;
  public username!: string;
  public password!: string | null;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(50)
    },
    password: {
      type: DataTypes.STRING(500)
    }
  },
  {
    tableName: "users",
    sequelize,
  }
);


