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
			if (typeof cb === 'undefined') {
				throw new Error('You must provide a callback method.');
			}

			if (typeof cb !== 'function') {
				throw new TypeError('Listener must be a function');
			}

			this.events[event] = this.events[event] || [];
			this.events[event].push(cb);

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
				if (v === cb) {
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

			if (typeof listeners !== 'undefined') {
				listeners = listeners.slice(0);

				listeners.forEach(function (v) {
					v.apply(_this, args);
				});
			}

			return this;
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