const Sequelize = require('sequelize');

class Wallet extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await Wallet.init({
            name: {type: Sequelize.STRING},
            status: {
                type: Sequelize.SMALLINT,
                defaultValue: 1
            },
            invoice: {type: Sequelize.STRING},
            customer_id: {
                type: Sequelize.BIGINT
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            }
        },
        {
            sequelize, modelName: 'Wallet', tableName: 'wallet', timestamps: true
        }
    )
    return Wallet
}