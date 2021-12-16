const Tx = require('../../db/controllers/tx')
const auth = require("../../api/lib/auth");
const {checkParams} = require("../helpers/helpController");

module.exports = class ExchangesController {
	async fetchListPagination(req, res) {
		try {
			const {authorization} = req.headers;
			const {current_page = 1, limit = 15} = req.query;
			await checkParams(authorization, 'authorization');

			await auth.checkJWT(authorization)
				.then(async () => {
					await Tx.fetchListPagination({current_page, limit})
						.then(async wallet => {
							res.status(200).json({data: wallet})
						})
						.catch((err) => {
							throw {code:403, message: err.message}
						})
				})
				.catch(err => {
					throw {code:401, message: err.message}
				})
		} catch (err) {
			res.status(err.code).json({message: err.message})
		}
	}

	async fetchListFromWalletPagination(req, res){
		try {
			const {authorization} = req.headers;
			const {current_page = 1, limit = 15} = req.query;
			const {wallet} = req.params;
			await checkParams(wallet, 'wallet');
			console.log("WALLET", wallet)
			await checkParams(authorization, 'authorization');
			await auth.checkJWT(authorization)
				.then(async () => {
					await Tx.fetchListFromWalletPagination({wallet, current_page, limit})
						.then(async wallet => {
							res.status(200).json({data: wallet})
						})
						.catch((err) => {
							throw {code:403, message:err.message}
						})
				})
				.catch(err => {
					throw {code:401, message: err.message}
				})
		} catch (err) {
			res.status(err.code).json({err: err.message})
		}
	}
}


