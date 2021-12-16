module.exports = {
	fetchFormatPagination(params, rows){
		return {
			current_page: parseInt(params.current_page),
			rows: rows.rows,
			last_page: Math.ceil(rows.count / params.limit) ,
			count: rows.count
		}
	}
}