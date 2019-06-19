'use strict';

export default class Analysis {
	constructor () { this.value = 0 }
	increment () { this.value += 1; return this }
	display () { return this.value }
}