define('mediator', function () {
	"use strict";
	var subscribers = {
		any: [] // types of events
	};

	function visitSubscribers(action, type, arg, context) {
		var pubtype = type || 'any',
			subs = subscribers[pubtype],
			i,
			max = subs ? subs.length : 0;
		for (i = 0; i < max; i += 1) {
			if (action === 'publish') {
				subs[i].fn.call(subs[i].context, arg);
			} else {
				if (subs[i].fn === arg && subs[i].context === context) {
					subs.splice(i, 1);
				}
			}
		}
	}

	return {
		subscribe: function (type, fn, context) {
			type = type || 'any';
			fn = (typeof fn === 'function') ? fn : context[fn];
			if (typeof subscribers[type] === 'undefined') {
				subscribers[type] = [];
			}
			subscribers[type].push({fn: fn, context: context || this});
		},
		unSubscribe: function (type, fn, context) {
			visitSubscribers.apply(this, ['unsubscribe', type, fn, context]);
		},
		publish: function (type, publication) {
			visitSubscribers.apply(this, ['publish', type, publication]);
		}
	};
});
