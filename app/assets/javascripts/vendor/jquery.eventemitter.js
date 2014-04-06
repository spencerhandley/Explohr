/*
  Original: http://james.padolsey.com/javascript/jquery-eventemitter/
  Edits:
  - emit to use triggerHandler instead of trigger.
	http://api.jquery.com/trigger/
	Note: For both plain objects and DOM objects other than window, if a triggered event name matches the name of a property on the object, jQuery will attempt to invoke the property as a method if no event handler calls event.preventDefault(). If this behavior is not desired, use .triggerHandler() instead.
*/

(function (jQuery) {
	jQuery.eventEmitter = {
		_JQInit: function() {
			this._JQ = jQuery(this);
		},
		emit: function(evt, data) {
			!this._JQ && this._JQInit();
			this._JQ.triggerHandler(evt, data);
		},
		once: function(evt, handler) {
			!this._JQ && this._JQInit();
			this._JQ.one(evt, handler);
		},
		on: function(evt, handler) {
			!this._JQ && this._JQInit();
			this._JQ.bind(evt, handler);
		},
		off: function(evt, handler) {
			!this._JQ && this._JQInit();
			this._JQ.unbind(evt, handler);
		}
	};
}(jQuery));
