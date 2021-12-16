const Sequelize = require('sequelize');

class Administrator extends Sequelize.Model {
}

const {DataTypes} = require("sequelize");

module.exports = async (sequelize) => {
    await Administrator.init({
            name: {type: Sequelize.STRING},
            email: {
                type: Sequelize.STRING
            },
            wallet: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.SMALLINT,
                defaultValue: 1
            },
            root: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            /**
             * 0- moderator 1- admin, 2- editor, 3 -moderator
             */
            permission_type: {
                type: Sequelize.SMALLINT,
                defaultValue: 1
            },

            create_read_only:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            create_update:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            remove_read_only:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            remove_update:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            setting_read_only:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            setting_update:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            token_read_only:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            token_update:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }

},
        {
            sequelize, modelName: 'Administrator', tableName: 'administrator', timestamps: true
        }
    )
    return Administrator
}