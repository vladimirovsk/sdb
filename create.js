'use strict';

/**
 *  From create space structure databases from ./db/models
 */
const  models = require('./db'),
    sequelize = models.sequelize;
    sequelize.sync({force: false});