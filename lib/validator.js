var Validator = require('validator').Validator;

Validator.prototype.error = function (msg) {
	if (this.fieldName) {
		if (!this._errors.fields[this.fieldName]) this._errors.fields[this.fieldName] = [];
		this._errors.fields[this.fieldName].push(msg);

		this._errors.total++;
	} else {
		this._errors.push(msg);
	}

	return this;
};

Validator.prototype.getErrors = function () {
	if (this._errors.fields) return this._errors.total ? this._errors : null;
	return this._errors;
};

Validator.prototype.checkField = function (fieldName, str, fail_msg) {
	this._errors = this._errors || { fields: {}, total: 0 };

	this.fieldName = fieldName;
	return this.check(str, fail_msg);
};

Validator.pgError = function (err) {
	if (!err.message || !err.code) return err;

	var errorObj = { fields: {}},
		fieldName,
		errorMessage;

	switch (err.code) {
		case '23502':
			fieldName = err.message.match(/"(\w+)/)[1];
			errorMessage = 'Required';
			break;
		case '23505':
			fieldName = err.detail.match(/\((\w+)\)=/)[1];
			errorMessage = 'Already in use';
			break;
		default:
			return err;
	}

	errorObj.fields[fieldName] = [errorMessage];
	return errorObj;
};

module.exports = Validator;
