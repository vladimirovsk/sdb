const db = require("../../db");
const { Op } = require("sequelize");
const Admin = db.sequelize.model("Administrator");

module.exports = {
    async setPermissionParams(data) {
        return await Admin.update(
            {
                create_read_only: data.create_read_only,
                create_update: data.create_update,
                remove_read_only: data.remove_read_only,
                remove_update: data.remove_update,
                setting_read_only: data.setting_read_only,
                setting_update: data.setting_update,
                token_read_only: data.token_read_only,
                token_update: data.token_update,
            },
            {
                where: {
                    email: data.email,
                },
            }
        )
            .then((row) => {
                if (row[0] > 0) {
                    return { status: true };
                } else {
                    throw {
                        code: 403,
                        message:
                            "Error changes password fount address pair " +
                            data.address,
                    };
                }
            })
            .catch((err) => {
                throw { code: 401, message: err.message };
            });
    },

    async setWalletAdmin(data) {
        console.log(data);
        return await Admin.update(
            {
                wallet: data.wallet,
            },
            {
                where: {
                    email: data.email,
                },
            }
        )
            .then((row) => {
                if (row[0] > 0) {
                    return { status: true };
                } else {
                    throw {
                        code: 403,
                        message: "Error set wallet from admin " + data.email,
                    };
                }
            })
            .catch((err) => {
                throw { code: 401, message: err.message };
            });
    },

    async setTypeAdmin(data) {
        return await Admin.update(
            {
                permission_type: data.typeAdmin,
            },
            {
                where: {
                    email: data.email,
                },
            }
        )
            .then((row) => {
                if (row[0] > 0) {
                    return { status: true };
                } else {
                    throw {
                        code: 403,
                        message:
                            "Error changes password fount address pair " +
                            data.address,
                    };
                }
            })
            .catch((err) => {
                throw { code: 401, message: err.message };
            });
    },

    async fetchList(data) {
        return await Admin.findAndCountAll({
            ...data,
            attributes: [
                "id",
                "name",
                "email",
                "status",
                "root",
                "createdAt",
                "updatedAt",
                "permission_type",
                "create_read_only",
                "create_update",
                "remove_read_only",
                "remove_update",
                "setting_read_only",
                "setting_update",
                "token_read_only",
                "token_update",
            ],
        })
            .then((rows) => {
                return rows;
            })
            .catch((err) => {
                throw err;
            });
    },

    async createAdmin(data) {
        return await Admin.findOrCreate({
            where: {
                email: data.email,
            },

            defaults: {
                email: data.email || "",
                name: data.name || data.email,
                password: data.password,
                status: 1,
            },
        });
    },

    async editPassword(data) {
        return await Admin.update(
            {
                password: data.password,
            },
            {
                where: {
                    email: data.email,
                },
            }
        )
            .then((row) => {
                if (row[0] > 0) {
                    return { status: true };
                } else {
                    throw {
                        code: 403,
                        message:
                            "Error changes password fount address pair " +
                            data.address,
                    };
                }
            })
            .catch((err) => {
                throw { code: 401, message: err.message };
            });
    },

    async findAdminFromEmail(email) {
        return await Admin.findOne({
            where: {
                email: email,
            },
        })
            .then((rows) => {
                return rows;
            })
            .catch((err) => {
                throw err;
            });
    },
};
