angular.module('app.services')
	.service('userService', function($http) {

		this.getUsuarios = getUsuarios;
		var servicio = '/users';

		function getUsuarios() {
			var route = 'http://localhost:1337' + servicio;
			var req = {
				method: 'GET',
				url: route
			};

			return $http(req)
				.then(success)
				.catch(fail);

			function success(response) {
				return response.data;
			}	

			function fail(error) {
				return $q.reject(error);
			}
		}
});

angular.module('app.controllers')
		.controller('UserController',UserController);

function UserController(userService) {

	userService.getUsuarios().then(function (response) {
		console.log(response);
	});
}				
