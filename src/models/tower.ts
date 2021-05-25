import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

export default class TowerModel extends Model {
  public id!: number;
  public name!: string;
  public location!: string | null;
  public floors!: number;
  public offices!: number;
  public rating!: number;
  public latitude!: string;
  public longitude!: string;
}

TowerModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50)
    },

    location: {
      type: DataTypes.STRING(50)
    },
    floors: {
      type: DataTypes.INTEGER
    },
    offices: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.INTEGER
    },
    latitude: {
      type: DataTypes.STRING(50)
    },
    longitude: {
      type: DataTypes.STRING(50)
    }
  },
  {
    tableName: "tower",
    sequelize,
  }
);

