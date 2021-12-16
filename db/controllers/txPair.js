const db = require('../../db')
const txPair = db.sequelize.model("TxPair");

const query = require('./query/txPairs')
const {fetchFormatPagination} = require('./helpers/returnFormatPagination')

module.exports = {
	async calcVolumePeriod(data){
		return await txPair.sequelize.query(query.calcVolumePeriod.text,
			{
				replacements: {pair_id: parseInt(data.pair_id), DAY: data.day},
				type: db.sequelize.QueryTypes.SELECT
			})
			.then(async (rows) => {
				return await rows[0]
			})
			.catch(err => {
				throw err
			})
	},

	async fetchPairHistoryHour(data){
		let current_page = 1;
		let limit = 15;
		if (Boolean(data.current_page)) {
			current_page = data.current_page
		}
		if (Boolean(data.limit)) {
			limit = data.limit
		}
		return await txPair.sequelize.query(query.fetchPairHistoryHour.text,
			{
				replacements: {
					limit: parseInt(limit),
					offset: parseInt(current_page-1) * parseInt(limit),
					pair: data.pair
				},
				type: db.sequelize.QueryTypes.SELECT
			}
		).then(async rows => {
			rows = {...rows, count:rows.length, rows: rows}
			return await fetchFormatPagination(data, rows)

		})
			.catch(err => {
				throw err
			})
	},

	async fetchPairHistoryDay(data) {
		let current_page = 1;
		let limit = 15;
		if (Boolean(data.current_page)) {
			current_page = data.current_page
		}
		if (Boolean(data.limit)) {
			limit = data.limit
		}
		return  await txPair.sequelize.query(query.fetchPairHistoryDay.text,
			{
				replacements: {
					limit: parseInt(limit),
					offset: parseInt(current_page-1) * parseInt(limit),
					pair: data.pair
				},
				model:txPair,
				mapToModel:true,
				type: db.sequelize.QueryTypes.SELECT
			})
			.then(async (rows) => {
			 rows = {...rows, count:rows.length, rows: rows}
			 return await fetchFormatPagination(data, rows)
			})
			.catch(err => {
				throw err
			})
	},

	async createTxPair(data) {
		return await txPair.create({
			pair_id: parseInt(data.pair_id),
			volume: parseFloat(data.volume),
			fee: parseFloat(data.fee)
		})
			.then(rows => {
				return rows
			})
			.catch(err => {
				throw err
			})
	}
}