const Sequelize = require('sequelize');

class Tx extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await Tx.init({
            hash: {type: Sequelize.STRING},
            address: {type: Sequelize.STRING},
            from: {type: Sequelize.STRING},
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            contract_type_id:{
                type: Sequelize.SMALLINT,
                defaultValue: 0
            },
            method:{
                type: Sequelize.STRING,
            },
            event_type_id:{
                type: Sequelize.SMALLINT,
                defaultValue: 0
            },
            block_number:{
                type: Sequelize.BIGINT,
                defaultValue: 0
            }
        },
        {
            sequelize, modelName: 'Tx', tableName: 'tx', timestamps: true
        }
    )
    return Tx
}