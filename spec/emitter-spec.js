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
		let func = () => {};

		stub.on('testevent', func);

		expect(func).toEqual(jasmine.any(Function));

		expect(stub.events).toEqual(jasmine.objectContaining({
			testevent: [func]
		}));
	});
});

describe('Emitter triggering', () => {
	let stub,
		called = false;

	beforeEach((done) => {
		class Stub extends Emitter{
			emit(){
				this.trigger('testevent');
			}

			emitWithData(){
				this.trigger('testeventdata', {
					foo: 'bar',
					baz: 'buzz'
				});
			}
		}

		stub = new Stub();

		done();
	});

	afterEach(() => {
		stub = null;
		called = false;
	});

	it('should make a call to trigger with event name', () => {
		spyOn(stub, 'trigger');

		stub.emit();

		expect(stub.trigger).toHaveBeenCalledWith('testevent');
	});

	it('should error if no event name is provided', () => {
		expect(() => {
			stub.trigger();
		}).toThrowError(Error);
	});

	it('should be true if event was called', (done) => {
		stub.on('testevent', () => {
			called = true;

			expect(called).toBeTruthy();

			done();
		});

		stub.emit();
	});

	it('should contain custom data in callback', (done) => {
		stub.on('testeventdata', (data) => {
			called = true;

			expect(called).toBeTruthy();

			expect(data).toBeDefined();

			expect(data).toEqual(jasmine.objectContaining({
				foo: 'bar',
				baz: 'buzz'
			}));

			done();
		});

		stub.emitWithData();
	});
});

describe('Emitter destroying', () => {
	let stub,
		timesCalled = 0;

	beforeEach((done) => {
		class Stub extends Emitter{
			startEmitter(){
				setInterval(() => {
					this.trigger('called');
				}, 500);
			}

			triggerTestEvent(){
				this.trigger('eventone');
			}

			triggerAnotherTestEvent(){
				this.trigger('eventtwo');
			}
		}

		stub = new Stub();

		done();
	});

	afterEach(() => {
		stub = null;
		timesCalled = 0;
	});

	it('should be able to remove an event', (done) => {
		let func = () => {
			timesCalled++;
		};

		stub.on('called', func);

		setTimeout(() => {
			stub.off('called', func);

			expect(stub.eventLength).toEqual(0);
			expect(stub.events['called']).toBeUndefined();
			expect(timesCalled).toEqual(3);

			done();
		}, 2000);

		stub.startEmitter();
	});

	it('should throw an error if a callback is not defined or is not a function', (done) => {
		let func = () => {};

		stub.on('called', func);

		setTimeout(() => {
			expect(() => {
				stub.off('foo');
			}).toThrowError(Error);

			expect(() => {
				stub.off('foo', 'bar');
			}).toThrowError(TypeError);

			done();
		}, 500);
	});

	it('should throw an error if the event is not found', (done) => {
		let func = () => {};

		stub.on('called', func);

		setTimeout(() => {
			expect(() => {
				stub.off('foo', func);
			}).toThrowError(Error);

			done();
		}, 500);
	});

	it('should only remove the event we specify', (done) => {
		let func = () => {};
		let functwo = () => {};

		stub.on('eventone', func);
		stub.on('eventtwo', functwo);

		setTimeout(() => {
			stub.off('eventone', func);

			expect(stub.eventLength).toEqual(1);
			expect(stub.events['eventone']).toBeUndefined();
			expect(stub.events['eventtwo']).toBeDefined();

			done();
		}, 600);

		stub.triggerTestEvent();
		stub.triggerAnotherTestEvent();
	});
});