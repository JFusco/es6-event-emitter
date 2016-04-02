'use strict';

const emitter = new WeakMap();

class Emitter {
	constructor(){
		emitter.set(this, {
			events: {}
		});

		this.eventLength = 0;
	}

	on(event, cb){
		if(typeof cb === 'undefined') {
			throw new Error('You must provide a callback method.');
		}

		if(typeof cb !== 'function') {
			throw new TypeError('Listener must be a function');
		}

		this.events[event] = this.events[event] || [];
		this.events[event].push(cb);

		this.eventLength++;

		return this;
	}

	off(event, cb){
		if(typeof cb === 'undefined') {
			throw new Error('You must provide a callback method.');
		}

		if(typeof cb !== 'function') {
			throw new TypeError('Listener must be a function');
		}

		if(typeof this.events[event] === 'undefined'){
			throw new Error(`Event not found - the event you provided is: ${event}`);
		}

		const listeners = this.events[event];

		listeners.forEach((v, i) => {
			if(v === cb) {
				listeners.splice(i, 1);
			}
		});

		if(listeners.length === 0){
			delete this.events[event];

			this.eventLength--;
		}

		return this;
	}

	trigger(event, ...args){
		if(typeof event === 'undefined'){
			throw new Error('You must provide an event to trigger.');
		}

		let listeners = this.events[event];

		if(typeof listeners !== 'undefined') {
			listeners = listeners.slice(0);

			listeners.forEach((v) => {
				v.apply(this, args);
			});
		}

		return this;
	}

	get events(){
		return emitter.get(this).events;
	}
}

export default Emitter;