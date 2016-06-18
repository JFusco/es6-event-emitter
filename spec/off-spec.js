'use strict';

import Emitter from '../src/emitter';

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
		const func = () => {
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
		const func = () => {};

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
		const func = () => {};

		stub.on('called', func);

		setTimeout(() => {
			expect(() => {
				stub.off('foo', func);
			}).toThrowError(Error);

			done();
		}, 500);
	});

	it('should only remove the event we specify', (done) => {
		const func = () => {};
		const functwo = () => {};

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