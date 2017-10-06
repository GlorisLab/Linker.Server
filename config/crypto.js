module.exports = {
	salt: 'GoodBoyCowboy',
	formToken: function (token) {
		return 'bearer ' + token;
	}
};
