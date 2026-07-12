'use strict';
const Store = require('electron-store');

const store = new Store({
	defaults: {},
});

module.exports = store;
