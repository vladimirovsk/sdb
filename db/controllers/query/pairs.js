const selectFieldsPairs = `
    p.*,
    concat(t0.code, '/', t1.code) as code,
                      t0.code                       as token0_code,
                      t1.code                       as token1_code,
                      p.code                        as symbol,
                      t0.image                      as image0,
                      t1.image                      as image1
`;

module.exports = models = {
    recordCount: {
        required_fields: [],
        text: `SELECT count(id) as count
               FROM pairs
               WHERE active = true`
    },

    fetchOnePair: {
        text: `SELECT ${selectFieldsPairs}
               FROM pairs p
                        left join token t0 on p.token0 = t0.token
                        left join token t1 on p.token1 = t1.token
               WHERE p.active = true
#                  and p.status = true
                 and p.pair = :pair
        `
    },

    fetchList: {
        text: `SELECT ${selectFieldsPairs}
               FROM pairs p
                        left join token t0 on p.token0 = t0.token
                        left join token t1 on p.token1 = t1.token
               WHERE p.active = true
                 and p.status = true
                 and p.pair like :address
               LIMIT :limit OFFSET :offset
        `
    },

    fetchListStaking: {
        text: `SELECT ${selectFieldsPairs}
               FROM pairs p
                        left join token t0 on p.token0 = t0.token
                        left join token t1 on p.token1 = t1.token
               WHERE p.active = true
                 and p.status = true
                 and p.staking >= :staking  
                 and p.pool_index >= 0

               LIMIT :limit      `
    },

    fetchListAll: {
        text: `SELECT ${selectFieldsPairs}
               FROM pairs p
                        left join token t0 on p.token0 = t0.token
                        left join token t1 on p.token1 = t1.token
               WHERE p.active = true
                 and p.pair like :address
               LIMIT :limit OFFSET :offset
        `
    },

    findPairs: {
        text: `SELECT ${selectFieldsPairs}
               FROM pairs p
                        left join token t0 on p.token0 = t0.token
                        left join token t1 on p.token1 = t1.token
               WHERE concat(t0.code, '/', t1.code) like :code
                 and p.active = true
               LIMIT :limit OFFSET :offset`
    },

    findPairsFromTokens: {
        text: `SELECT p.*
               FROM pairs p
               WHERE (p.token0 = :token0 or p.token0 = :token1)
                 and (p.token1 = :token1 or p.token1 = :token0)
                 and p.active = true
        `
    },

    fetchPairsListFromToken: {
        text: `SELECT p.pair, p.token0, p.token1
               FROM pairs p
               WHERE (p.token0 = :token)
                  or (p.token1 = :token)
                   and
                     p.active = true
        `
    }
}