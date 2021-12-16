'use strict';
const conf = require('../config')
const Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path')
let db = {}

const sequelize = new Sequelize(
    conf.mysql.database,
    conf.mysql.user,
    conf.mysql.password,
    {
        host: conf.mysql.host,
        dialect: "mysql",
        operatorsAliases: 0,
        logging: false,
        pool: {
            max: conf.mysql.pool.max || 5,
            min: conf.mysql.pool.min || 0,
            acquire: conf.mysql.pool.acquire || 30000,
            idle: conf.mysql.pool.idle || 10000
        }
    }
)
fs.readdirSync(__dirname+'/models/').forEach(file => {
    let model = require(path.join(__dirname+/models/, file))(sequelize, Sequelize);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize.sync({force: false});

module.exports = db;


