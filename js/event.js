define('event', function () {
	"use strict";
	return new function () {
		var adE = 'addEventListener',
			atE = 'attachEvent';

		function _each(list, callback) {
			var i = 0;
			for (; i < list.length; i++) {
				callback(list[i]);
			}
		}

		function _bindHandler(o, e, h) {
			if (o[adE]) {
				o[adE](e, h, !1);
			} else if (o[atE]) {
				o[atE]('on' + e, h);
			} else {
				o['on' + e] = (function (iH) {
					return function () {
						h();
						return iH.apply(this, arguments);
					};
				}(o['on' + e]));
			}
		}

		function _normalizeEvent(e) {
			e = e || window.event;
			if (e.srcElement) {
				e.target = e.srcElement
			}
			return e;
		}

		this.bind = function (eventType, obj, handler) {
			obj = obj.length ? obj : [obj];

			if (obj.length) {
				_each(obj, function (el) {
					var _handler = function (event) {
						handler.call(el, _normalizeEvent(event));
					};
					_bindHandler(el, eventType, _handler);
				});
			}
		};

		this.delegate = function (container, test, eventType, handler) {
			var _node,
				_handler = function (event) {
					event = _normalizeEvent(event);
					_node = event.target;
					while((_node && _node.parentNode) && _node !== container && _node !== document) {
						if (test(_node)) {
							handler.call(_node, event);
							break;
						}
						_node = _node.parentNode;
					}
				};
			_bindHandler(container, eventType, _handler);
		};
	}();
});
