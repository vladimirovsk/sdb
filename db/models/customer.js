const Sequelize = require('sequelize');

class Customer extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await Customer.init({
            name: {type: Sequelize.STRING},
            status: {
                type: Sequelize.SMALLINT,
                defaultValue: 1
            },
            email: {
                type: Sequelize.STRING
            }
        },
        {
            sequelize, modelName: 'Customer', tableName: 'customer', timestamps: true
        }
    )
    return Customer
}