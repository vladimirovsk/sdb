const EventEmitter = require('events');
const flowEmitter = new EventEmitter;
flowEmitter.setMaxListeners(flowEmitter.getMaxListeners() + 1);
global.eventEmitter = flowEmitter;

/**
 * Listeners
 */
require('../api/events/transaction.js')
require('../api/events/staking.js')
require('../api/events/pairs.js')
/**
 * Add to do from service
 */
require('./tasks/monitoringContract');
require('./tasks/monitoringValuePair');
require('./tasks/monitoringValueToken');