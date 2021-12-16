module.exports = models = {
    calcVolumePeriod: {
        text: `
            select max(tx.volume) as volume
            from tx_pair tx
            where tx.pair_id = :pair_id
              and tx.createdAt >= NOW() - INTERVAL :DAY DAY
        `
    },
    fetchPairHistoryDay: {
        text: `SELECT DATE_FORMAT(tp.createdAt, '%d.%m.%Y') as DATE,
                      p.pair,
                      tp.pair_id,
                      sum(tp.volume)                        as volume,
                      sum(tp.fee)                           as Fee
               FROM tx_pair tp
                        left join pairs p on tp.pair_id = p.id

               WHERE p.pair = :pair

               GROUP BY DATE, pair, pair_id

               ORDER BY DATE DESC

               LIMIT :limit OFFSET :offset     `
    },
    fetchPairHistoryHour: {
        text: `
            SELECT DATE_FORMAT(tp.createdAt, '%H:%00')    as HOUR,
                   DATE_FORMAT(tp.createdAt, '%d.%m.%Y') as DATE,
                   p.pair,
                   tp.pair_id,
                   avg(tp.volume)                        as volume,
                   sum(tp.fee)                           as Fee
            FROM tx_pair tp
                     left join pairs p on tp.pair_id = p.id

            WHERE p.pair = :pair

            GROUP BY DATE, HOUR, pair, pair_id

            ORDER BY DATE DESC, HOUR DESC

            LIMIT :limit OFFSET :offset
        `
    },

    findPrice24FromToken: {
        text: `select max(tp.volume)                                as price_max,
                      min(tp.price)                                 as price_min,
                      ((min(tt.price) * 100 / max(tt.price)) - 100) as proc
               from tx_pair tp
               where tt.token_id = :token_id
                 and
# 				      //TODO HARDCODE FROM TEST 
                   tt.createdAt >= NOW() - INTERVAL 1 DAY`
    }
}