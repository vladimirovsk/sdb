const Sequelize = require('sequelize');

class Pairs extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await Pairs.init({
            code: {type: Sequelize.STRING},
            pair: {
                type: Sequelize.STRING,
                unique: true
            },
            index: {
                type: Sequelize.INTEGER,
                unique: true
            },
            token0: {type: Sequelize.STRING},
            token1: {type: Sequelize.STRING},
            balance:{
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            liquidity: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            volume_24: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            volume_7: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            fees_24: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            fees_7: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            fees_year: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            amount_token0:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            amount_token1:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            tvl: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            apr:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            swap:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            earn:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            earn_amount :{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            pool_index:{
                type:Sequelize.DOUBLE,
                defaultValue: 0
            },
            staking:{
                type:Sequelize.BOOLEAN,
                defaultValue: true
            },
            status:{
                type:Sequelize.BOOLEAN,
                defaultValue: true
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            }
        },
        {
            sequelize, modelName: 'Pairs', tableName: 'pairs', timestamps: true
        }
    )
    return Pairs
}