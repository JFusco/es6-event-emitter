'use strict';

import Emitter from '../src/emitter';

describe('Emitter registration', () => {
	let stub;

	beforeEach(() => {
		class Stub extends Emitter{}

		stub = new Stub();
	});

	afterEach(() => {
		stub = null;
	});

	it('should add event to call stack', () => {
		stub.on('testevent', () => {});

		expect(stub.events['testevent']).toBeDefined();
	});

	it('should check if callback is undefined', () => {
		expect((() => {
				stub.on('testevent')
			})
		).toThrowError(Error);
	});

	it('should check if callback is a function', () => {
		expect((() => {
				stub.on('testevent', 'function')
			})
		).toThrowError(TypeError);
	});

	it('should check if event contains callback', () => {
		const cb = () => {};

		stub.on('testevent', cb);

		expect(cb).toEqual(jasmine.any(Function));

		expect(stub.events).toEqual(jasmine.objectContaining({
			testevent: [{
        cb,
        once: false
      }]
		}));
	});
});
