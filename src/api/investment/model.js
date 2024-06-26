import { DataTypes, Model } from 'sequelize';
import sequelize from '../../services/sequelize';

class Investment extends Model {
  view(full) {
    const view = {};
    let fields = ['userId', 'parcId', 'amount', 'profitability_ratio', 'is_rewarded', 'createdAt'];

    if (full) {
      fields = [...fields];
    }

    fields.forEach((field) => {
      view[field] = this[field];
    });

    return view;
  }
}

Investment.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parcId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    profitability_ratio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    is_rewarded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Investment',
    timestamps: true,
    underscored: true,
  }
);

export default Investment;
