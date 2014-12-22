var mainModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $timeout, $http){
		$scope.users = [
			{
				id: 0,
				firstName: "Michal",
				surname: "Paszkiewicz"
			},
			{
				id: 1,
				firstName: "Aaron",
				surname: "Dennis"
			},
			{
				id: 2
				firstName: "Dave",
				surname: "Da rave"
			}
		];
		
		$scope.projects = [
			{
				id: 0, 
				threads: [
					{
						id: 0, 
						projectID: 0, 
						subject: "when to do this",
						posts: [
							{
								id: 0,
								userID: 0,
								threadID: 0,
								projectID: 0
								date: "2014",
								message: "hi"
							},
							{
								id: 1,
								userID: 2,
								threadID: 0								threadID: 0,
								projectID: 0
								date: "2014",
								message: "hi"
							}
						]
					},
					{
						id: 1, 
						projectID: 0, 
						subject: "stuff and things",
						posts: [
							{
								id: 2,
								userID: 1,
								threadID: 1,
								projectID: 0,
								date: "2014",
								message: "yo"
							},
							{
								id: 3,
								userID: 2,
								threadID: 1,
								projectID: 0,
								date: "2014",
								message: "kazaa"
							}
						]
					}
				]
			}
		];
	
	
	};
