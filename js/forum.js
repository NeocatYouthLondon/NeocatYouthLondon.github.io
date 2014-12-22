var mainModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $timeout, $http){
		$scope.currentProject = null;
		$scope.currentThread = null;
		$scope.show = "login";
		
		$scope.openThreads = function(project){
			$scope.show = "threads"; 
			$scope.currentProject = project; 
		}
		
		$scope.openPosts = function(thread){
			$scope.show = "posts";
			$scope.currentThread = thread;
		}
		
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
				id: 2,
				firstName: "Dave",
				surname: "Da rave"
			}
		];
		
		$scope.getItemFromID = function(array, id)
		{
			for(var i = 0; i < array.length; i++){
				if(array[i].id == id){
					return array[i];
				}
			}
			return false;
		}
		
		$scope.getIndexFromID = function(array, id)
		{
			for(var i = 0; i < array.length; i++){
				if(array[i].id == id){
					return i;
				}
			}
			return false;
		}
		
		$scope.projects = [
			{
				id: 0, 
				name: "Prince of Egypt",
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
								projectID: 0,
								date: "2014",
								message: "hi"
							},
							{
								id: 1,
								userID: 2,
								threadID: 0,								threadID: 0,
								projectID: 0,
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
			},
			{
				id: 1, 
				name: "The Lion King",
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
								projectID: 0,
								date: "2014",
								message: "hi"
							},
							{
								id: 1,
								userID: 2,
								threadID: 0,								threadID: 0,
								projectID: 0,
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
	
	
	});
