requirejs.config({
	"baseUrl": "lib",
	"paths": {
		"app": "../app",
		"angular": "angular-1.4.6"
	},
	shim:{
		'angular': {'exports': 'angular'}
	}
});

requirejs(['app/main']);