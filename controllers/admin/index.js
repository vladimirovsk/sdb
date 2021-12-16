const {createJWT, decodeJWT, refreshJWT} = require('../../api/lib/auth')
const Admin = require("../../db/controllers/administrator");
const bcrypt = require('bcrypt');
const {checkParams} = require("../helpers/helpController");
const auth = require("../../api/lib/auth");

module.exports = class AdminController {
    async changePassword(req, res) {
        try {
            const {newPassword, oldPassword} = req.body;
            const {authorization} = req.headers;
            await checkParams(newPassword, 'newPassword');
            await checkParams(oldPassword, 'oldPassword');
            await auth.checkJWT(authorization)
                .then((decoded) => {
                    Admin.findAdminFromEmail(decoded.email).then(data => {
                        let compare = bcrypt.compareSync(oldPassword, data.password, bcrypt.genSaltSync(256))
                        if (compare) {
                            Admin.editPassword({
                                email: decoded.email,
                                password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(256))
                            })
                                .then(row => {
                                    res.status(200).json(row)
                                })
                                .catch(
                                    err => {
                                        throw {code: 402, message: err.message}
                                    })
                        } else {
                            res.status(422).json({message: "Old password error", status: false})
                            throw err;
                        }
                    })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async createAdmin(req, res) {
        try {
            const {email, name = email, password} = req.body;
            const {authorization} = req.headers;
            //TODO add validate a email
            await checkParams(email, 'email');
            await checkParams(authorization, 'authorization');
            await checkParams(password, 'password');
            let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(256));
            await auth.checkJWT(authorization)
                .then(() => {
                    Admin.createAdmin({email, password: passwordHash, name})
                        .then(async (row) => {
                            res.status(200).json(row)
                        })
                        .catch(err => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async fetchListAdmin(req, res) {
        try {
            const {authorization} = req.headers;
            const {current_page, limit} = req.query;
            await auth.checkJWT(authorization)
                .then(async () => {
                    await Admin.fetchList({current_page, limit})
                        .then(async admin => {
                            res.status(200).json({data: admin})
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async loginAdmin(req, res) {
        const {email, password = ''} = req.body;
        Admin.findAdminFromEmail(email)
            .then(async row => {
                await checkParams(email, 'email');
                if (Boolean(row)) {
                    let compare = bcrypt.compareSync(password, row.password, bcrypt.genSaltSync(256))
                    if (compare) {
                        const token = await createJWT({email, admin: true});
                        const tokenRefresh = await refreshJWT({email, admin: true})
                        res.status(200).json({auth: compare, token, tokenRefresh, email})
                    } else {
                        throw {code: 422, message: "Error email or password"};
                    }
                } else {
                    throw {code: 422, message: "D'ont found admin " + email};
                }
            })
            .catch((err) => {
                res.status(err.code).json({auth: false, err: err.message})
            })
    }

    async setTypeAdmin(req, res) {
        try {
            const {authorization} = req.headers;
            const {typeAdmin = 1, email} = req.body;
            await auth.checkJWT(authorization)
                .then(async (data) => {
                    await Admin.setTypeAdmin({typeAdmin, email})
                        .then(data => {
                            res.status(200).json({data})
                        })
                        .catch(err => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }

    }

    async setPermissionParams(req, res) {
        try {
            const {
                create_read_only = false,
                create_update = false,
                remove_read_only = false,
                remove_update = false,
                setting_read_only = false,
                setting_update = false,
                token_read_only = false,
                token_update = false,
                email } = req.body;
            const {authorization} = req.headers;
            await auth.checkJWT(authorization)
                .then(async (data) => {
                    await Admin.setPermissionParams({
                        create_read_only,
                        create_update,
                        remove_read_only,
                        remove_update,
                        setting_read_only,
                        setting_update,
                        token_read_only,
                        token_update,
                        email
                    })
                        .then(data => {
                            res.status(200).json({data})
                        })
                        .catch(err => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })

        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async setWalletAdmin(req, res) {
        try {
            const {authorization} = req.headers;
            const {wallet, email} = req.body;
            await checkParams(email, 'email');
            await checkParams(wallet, 'wallet');
            await auth.checkJWT(authorization)
                .then(async () => {
                    await Admin.setWalletAdmin({
                        wallet,
                        email
                    })
                        .then(data => {
                            res.status(200).json({wallet, email, data})
                        })
                        .catch(err => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

}