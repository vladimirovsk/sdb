module.exports = models = {
	fetchTokenHistoryDay: {
		text: `
            SELECT DATE_FORMAT(t.createdAt, '%d.%m.%Y') as DATE,
                   t.token,
                   tt.token_id,
                   sum(tt.volume)                        as volume,
                   sum(tt.fee)                           as Fee
            FROM tx_token tt
                     left join token t on t.id = tt.token_id

            WHERE t.token = :token

            GROUP BY DATE, token, token_id

            LIMIT :limit OFFSET :offset
		`
	},

	fetchTokenHistoryHour: {
		text: `
            SELECT DATE_FORMAT(tt.createdAt, '%H:%00')    as HOUR,
                   DATE_FORMAT(tt.createdAt, '%d.%m.%Y') as DATE,
                   t.token,
                   tt.token_id,
                   sum(tt.volume)                        as volume,
                   sum(tt.fee)                           as Fee
            FROM tx_token tt
                     left join token t on t.id = tt.token_id

            WHERE t.token = :token

            GROUP BY DATE, HOUR, token, token_id

            LIMIT :limit OFFSET :offset
		`
	},

	findAllSumValuesFromToken:{
		text:` select max(tx.volume) as volume,
             		DATE_FORMAT(tx.createdAt, '%d.%m.%Y %H:%00') as date
        			from tx_token tx
        		where
            		tx.token_id = :token_id
        		and
            		tx.createdAt >= NOW() - INTERVAL 1 DAY
        		GROUP BY date`

	},

	findPrice24FromToken:{
		text:`select max(tt.price) as price_max, min(tt.price) as price_min,
       			((min(tt.price)*100/max(tt.price))-100) as proc
				from tx_token tt
				where
        			tt.token_id = :token_id
  				and
# 				      //TODO HARDCODE FROM TEST 
        			tt.createdAt >= NOW() - INTERVAL 1 DAY`
	}
}