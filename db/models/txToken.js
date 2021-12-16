const Sequelize = require('sequelize');

class TxToken extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
	await TxToken.init({
			token_id: {
				type: Sequelize.BIGINT,
			},
			volume: {
				type: Sequelize.DOUBLE,
				defaultValue: 0
			},
			price: {
				type: Sequelize.DOUBLE,
				defaultValue: 0
			},
			fee: {
				type: Sequelize.DOUBLE,
				defaultValue: 0
			}
		},
		{
			sequelize, modelName: 'TxToken', tableName: 'tx_token', timestamps: true
		}
	)
	return TxToken
}