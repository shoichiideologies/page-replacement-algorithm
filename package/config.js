'use strict';
const Store = require('electron-store');

const store = new Store({
	defaults: {
		favoriteAnimal: '🦄',
	},
});

module.exports = store;
