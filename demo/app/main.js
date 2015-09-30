define(['angular','../../src/strToColor/norgeous-strToColor-0.0.1','../../src/strToColor/norgeous-crc32hex-0.0.1'], function (angular, strToColor, crc32hex) {

	var app = angular.module('myApp', []);
/*
	//crc32 filter
	app.filter('crc', function () {
		return function (str) {
			return crc32hex.str(str);
		};
	});

	// modemask
	app.filter('modemask', function () {
		return function (mode) {
			return ( "00000000" + ((strToColor.modes[mode]^255)>>> 0).toString(2) ).slice(-8);
		};
	});

*/

	//substring filter
	app.filter('substring', function () {
		return function (str, config = {}) {
			return str.substring(config.start, config.end);
		};
	});



	//Generic master
	app.filter('strToColorMaster', function () {
		return function (str, config = {}, config_override = {}) {
			if(Object.keys(config_override).length !== 0) for (var k in config_override) config[k] = config_override[k];		//merge config and config_override, giving preference to override keys but does not merge subkeys (like transforms array)
			var brehautColorObject = strToColor.colorize(str, config);
			return brehautColorObject;
		};
	});

	app.filter('strToColor', function ($filter) {
		return function (str, config_override = {}) {
			return $filter('strToColorMaster')(str, {}, config_override).toCSS();				//call other filter and return
		};
	});

	app.filter('strToDarkColor', function ($filter) {
		return function (str, config_override = {}) {
			var config = {
				transform:[
					{setSaturation:1},
					{setLightness:0.2}
				]
			};
			return $filter('strToColorMaster')(str, config, config_override).toCSS();				//call other filter and return
		};
	});













	app.filter('helper_showcrc', function ($filter) {
		return function (str, config_override = {}) {
			return $filter('strToColorMaster')(str, {}, config_override).crc;				//call other filter and return
		};
	});
	app.filter('helper_showmode', function ($filter) {
		return function (str, config_override = {}) {
			return $filter('strToColorMaster')(str, {}, config_override).mode;				//call other filter and return
		};
	});
	app.filter('helper_showmodemask', function ($filter) {
		return function (str, config_override = {}) {
			return $filter('strToColorMaster')(str, {}, config_override).modeMask;				//call other filter and return
		};
	});



















/*
	//Dark
	app.filter('strToColorDark', function ($filter) {
		return function (str, config_override = {}) {
			var config = {
				transform:[
					{setSaturation:1},
					{setLightness:0.2}
				]
			};
			return $filter('strToColorGeneric')(str, config, config_override);				//call other filter and return
		};
	});

	//Light
	app.filter('strToColorLight', function ($filter) {
		return function (str, config_override = {}) {
			var config = {
				transform:[
					{setSaturation:1},
					{setLightness:0.8}
				]
			};
			return $filter('strToColorGeneric')(str, config, config_override);				//call other filter and return
		};
	});







	//extend the generic filter into one for use, setting the config options directly here so we dont have to in the html
	app.filter('strToColorCustom', function ($filter) {
		return function (str) {
			var config = {
				transform:[
					{setSaturation:1},
					{setLightness:0.25}
				]
			};
			return $filter('strToColorGeneric')(str, config);
		};
	});



*/























	app.controller('demoLive', function ($scope) {
		$scope.teststring = "Administrator";
		$scope.words = ["PewDiePie","RihannaVEVO","KatyPerryVEVO","maybe","green","GREEN","red","blue","buckeroo","plumless"];
	});


});