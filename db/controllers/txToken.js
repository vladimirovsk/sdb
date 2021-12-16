const db = require('../../db')
const Web3 = require('web3');
const query = require("./query/txToken");
const txToken = db.sequelize.model("TxToken");


module.exports = {
	async fetchTokenHistoryHour(data) {
		let current_page = 1;
		let limit = 15;
		if (Boolean(data.current_page)) {
			current_page = data.current_page
		}
		if (Boolean(data.limit)) {
			limit = data.limit
		}
		return await txToken.sequelize.query(query.fetchTokenHistoryHour.text,
			{
				replacements: {
					limit: parseInt(limit),
					offset: parseInt(current_page-1) * parseInt(limit),
					token: data.token
				},
				type: db.sequelize.QueryTypes.SELECT
			}
		)
			.then(rows => {
			const count = rows.length;
			return {
				current_page: parseInt(data.current_page),
				rows: rows,
				last_page: Math.ceil(count / limit) - 1,
				count: count
			}
		})
			.catch(err => {
				throw err
			})
	},

	async fetchTokenHistoryDay(data) {
		let current_page = 1;
		let limit = 15;
		if (Boolean(data.current_page)) {
			current_page = data.current_page
		}
		if (Boolean(data.limit)) {
			limit = data.limit
		}

		return await txToken.sequelize.query(query.fetchTokenHistoryDay.text,
			{
				replacements: {
					limit: parseInt(limit),
					offset: parseInt(current_page-1) * parseInt(limit),
					token: data.token
				},
				type: db.sequelize.QueryTypes.SELECT
			})
			.then(rows => {
			const count = rows.length;
			return {
				current_page: parseInt(data.current_page),
				rows: rows,
				last_page: Math.ceil(count / limit) - 1,
				count: count
			}
		})
			.catch(err => {
				throw err
			})
	},

	async findPrice24FromToken(data){
		return await txToken.sequelize.query(query.findPrice24FromToken.text,
			{
				replacements: {
					token_id: data.token_id
				},
				type: db.sequelize.QueryTypes.SELECT
			})
			.then(rows => {
				for (let row of rows) {
					let proc = row.proc;
					if (isNaN(row.proc)||!Boolean(row.proc)) {proc =0}
				return parseFloat(proc).toFixed(4)
				}
			})
			.catch(err => {
				throw err.message
			})
	},

	async findAllSumValuesFromToken(data) {
		return await txToken.sequelize.query(query.findAllSumValuesFromToken.text,
			{
				replacements: {
					token_id: data.token_id
				},
				type: db.sequelize.QueryTypes.SELECT
			})
			.then(rows => {
				let volume = 0n
				for (let row of rows) {
					volume = BigInt(volume) + BigInt(row.volume)
				}
				if (parseInt(volume.toString()) > 0) {
					return Web3.utils.fromWei(volume.toString(), 'ether')
				} else {
					return 0;
				}
			})
			.catch(err => {
				throw err.message
			})

	},

	async createTxToken(data) {
		return await txToken.create({
			token_id: data.token_id,
			volume: parseFloat(data.volume),
			price: parseFloat(data.price),
			fee: data.fee
		})
			.then(rows => {
				return rows
			})
			.catch(err => {
				throw err
			})
	}
}