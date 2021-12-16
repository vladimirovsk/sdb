const Sequelize = require('sequelize');

class TxPair extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await TxPair.init({
            pair_id: {
                type: Sequelize.BIGINT,
            },
            volume: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            fee: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            }
        },
        {
            sequelize, modelName: 'TxPair', tableName: 'tx_pair', timestamps: true
        }
    )
    return TxPair
}