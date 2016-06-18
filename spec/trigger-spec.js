'use strict';

import Emitter from '../src/emitter';

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