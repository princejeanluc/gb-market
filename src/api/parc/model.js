import { DataTypes, Model } from 'sequelize';
import sequelize from '../../services/sequelize';
const { Client, PrivateKey, TokenCreateTransaction, AccountId } = require("@hashgraph/sdk");
import { ServerClient } from "../../services/hedera";

class Parc extends Model {
  // Vous pouvez ajouter des méthodes d'instance ou de classe ici
  view(full) {
    const view = {};
    let fields = [
        'id',
      'culture',
      'nbSerre',
      'cycleProduction',
      'diametreSerre',
      'quantiteUnitaire',
      'productionMinParSerre',
      'productionFerme',
      'estimationPrixGrosParKilo',
      'estimationCA',
      'latitude',
      'longitude',
    ];

    if (full) {
      fields = [...fields, 'createdAt'];
    }

    fields.forEach((field) => {
      view[field] = this[field];
    });

    return view;
  }
}

Parc.init(
  {
    culture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nbSerre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cycleProduction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diametreSerre: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantiteUnitaire: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productionMinParSerre: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productionFerme: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimationPrixGrosParKilo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimationCA: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Parc',
    timestamps: true,
    underscored: true,
  }
);



export default Parc;
