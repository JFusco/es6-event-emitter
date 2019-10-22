"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emitter = new WeakMap();

var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    emitter.set(this, {
      events: {}
    });
    this.eventLength = 0;
  }

  _createClass(Emitter, [{
    key: "on",
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
    key: "off",
    value: function off(event, cb) {
      if (typeof cb === 'undefined') {
        throw new Error('You must provide a callback method.');
      }

      if (typeof cb !== 'function') {
        throw new TypeError('Listener must be a function');
      }

      if (typeof this.events[event] === 'undefined') {
        throw new Error("Event not found - the event you provided is: ".concat(event));
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
    key: "trigger",
    value: function trigger(event) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
    key: "once",
    value: function once(event, cb) {
      this.on(event, cb, true);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      emitter["delete"](this);
      this.eventLength = 0;
    }
  }, {
    key: "events",
    get: function get() {
      return emitter.get(this).events;
    }
  }]);

  return Emitter;
}();

var _default = Emitter;
exports["default"] = _default;
