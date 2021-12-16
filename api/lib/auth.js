const jwt = require('jsonwebtoken');
const secret = conf.jwt_params.jwt_secret;
/**
 * Create JWT token
 * @param data
 * @param expiresIn
 * @returns {Promise<*>}
 */
const createJWT = async (data) => {
    let token = ''
    token = await jwt.sign(data, secret, {expiresIn: conf.jwt_params.jwt_option.expiresIn})
    return token;
}

/**
 * Decoding token
 * @param token
 * @returns {Promise<{payload: *, signature: *, header: *}|*>}
 */
const decodeJWT = async (token) => {
    let decoded = jwt.decode(token);
    return decoded;
}

const refreshJWT = async (context) => {
    return await jwt.sign(context, secret, {expiresIn: conf.jwt_params.jwt_option.expiresInReset})
}

const checkJWT = async (authorization) => {
    try {
        let bearerToken;
        if (authorization) {
            const bearer = authorization.split(' ');
            bearerToken = bearer[1];
            if (!Boolean(bearerToken)) {
                //throw {code:403, message:"Error Authorization Bearer"}
            }
            //TODO modify only Bearer
            if (Boolean(authorization) && !Boolean(bearerToken)) {
                bearerToken = authorization
            }
        }
        return await decodeJWT(bearerToken)
            .then(async decoded => {
                if (!Boolean(bearerToken)) {
                    throw {code:422, message:"Dont found headers: authorization"}
                }
                try {
                    let exp = decoded.exp;
                    let dt = parseInt(Date.now() / 1000);
                    console.log(exp, dt)
                    if (exp < dt) {
                        throw {code: 401, messages: "Token expired"}
                    }
                }catch (err){ throw {code: 422, message:"Error read token"} }
                return decoded;
            })
            .catch(err => {
                throw {code: err.code, message: err.message}
            })
    } catch (err) {
        throw err
    }
}


module.exports = {checkJWT, createJWT, decodeJWT, refreshJWT};

