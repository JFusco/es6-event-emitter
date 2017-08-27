'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _weakMap2.default();

var Emitter = function () {
	function Emitter() {
		(0, _classCallCheck3.default)(this, Emitter);

		emitter.set(this, {
			events: {}
		});

		this.eventLength = 0;
	}

	(0, _createClass3.default)(Emitter, [{
		key: 'on',
		value: function on(event, cb) {
			var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			if (typeof cb === 'undefined') {
				throw new Error('You must provide a callback method.');
			}

			if (typeof cb !== 'function') {
				throw new TypeError('Listener must be a function');
			}

			this.events[event] = this.events[event] || [];
			this.events[event].push({
				cb: cb,
				once: once
			});

			this.eventLength++;

			return this;
		}
	}, {
		key: 'off',
		value: function off(event, cb) {
			if (typeof cb === 'undefined') {
				throw new Error('You must provide a callback method.');
			}

			if (typeof cb !== 'function') {
				throw new TypeError('Listener must be a function');
			}

			if (typeof this.events[event] === 'undefined') {
				throw new Error('Event not found - the event you provided is: ' + event);
			}

			var listeners = this.events[event];

			listeners.forEach(function (v, i) {
				if (v.cb === cb) {
					listeners.splice(i, 1);
				}
			});

			if (listeners.length === 0) {
				delete this.events[event];

				this.eventLength--;
			}

			return this;
		}
	}, {
		key: 'trigger',
		value: function trigger(event) {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (typeof event === 'undefined') {
				throw new Error('You must provide an event to trigger.');
			}

			var listeners = this.events[event];
			var onceListeners = [];

			if (typeof listeners !== 'undefined') {
				listeners.forEach(function (v, k) {
					v.cb.apply(_this, args);

					if (v.once) onceListeners.unshift(k);

					onceListeners.forEach(function (v, k) {
						listeners.splice(k, 1);
					});
				});
			}

			return this;
		}
	}, {
		key: 'once',
		value: function once(event, cb) {
			this.on(event, cb, true);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			emitter.delete(this);

			this.eventLength = 0;
		}
	}, {
		key: 'events',
		get: function get() {
			return emitter.get(this).events;
		}
	}]);
	return Emitter;
}();

exports.default = Emitter;