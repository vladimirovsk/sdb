module.exports = {
    async checkParams(paramData, paramName) {
        if (!Boolean(paramData)) {
            throw {code: 422, message: "Don't found param " + paramName}
        }
    }
}