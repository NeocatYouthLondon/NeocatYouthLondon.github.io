var mainModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $timeout, $http){
		$scope.currentProject = null;
		$scope.currentThread = null;
		$scope.show = "login";
		$scope.newProjectName = "";
		$scope.newThreadSubject = "";
		$scope.newThreadMessage = "";
		$scope.newPost = "";
		
		$scope.openThreads = function(project){
			$scope.show = "threads"; 
			$scope.currentProject = project; 
		}
		
		$scope.openPosts = function(thread){
			$scope.show = "posts";
			$scope.currentThread = thread;
		}
		
		$scope.createProject = function(){
			$scope.projects.push({id: $scope.projects.length, name: $scope.newProjectName, threads: []});
			$scope.newProjectName = "";
			$scope.show="projects";
		}
		
		$scope.createThread = function(){
			$scope.currentProject.threads.push({
				id: $scope.currentProject.threads.length,
				subject: $scope.newThreadSubject,
				posts: [{id: 0, userID: 0, message: $scope.newThreadMessage}]
			})
			$scope.newThreadSubject = "";
			$scope.newThreadMessage = "";
			$scope.show="threads";
		}
		
		$scope.sendPost = function(){
			$scope.currentThread.posts.push({
				id: $scope.currentThread.posts.length,
				userID: 2,
				message: $scope.newPost
			});
			
			$scope.newPost= "";
		}
		
		$scope.users = [
			{
				id: 0,
				firstName: "Michal",
				surname: "Paszkiewicz",
				imageURL: "http://www.gravatar.com/avatar/f8231ccab5f14c6499e32e17700399d9?d=wavatar",
				websiteURL: "http://www.michalpaszkiewicz.co.uk",
				experience: "8 years live guitar playing",
				skills: "Software",
				openToPublic: true
			},
			{
				id: 1,
				firstName: "Aaron",
				surname: "Dennis",
				imageURL: "https://avatars3.githubusercontent.com/u/9275082?v=3&amp",
				websiteURL: "https://aaronjden.github.io",
				experience: "Lots of good experience",
				skills: "Software",
				openToPublic: true 
			},
			{
				id: 2,
				firstName: "Dave",
				surname: "Da rave",
				imageURL: "https://avatars2.githubusercontent.com/u/8076321?v=3&amp",
				websiteURL: "http://tametheboardgame.com/",
				experience: "40 years in the circus industry",
				skills: "Juggling",
				openToPublic: true
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
		
		$scope.currentUser = null;
		$scope.loggedIn = false;
		$scope.loginFailed = false;
	
		$scope.login = function(){
			var stringifiedPost = JSON.stringify(postObject);
			$http({method: "POST", url: serverURL + "/posts", data: stringifiedPost}).success(function(data, status){
				if(data){
					//todo: change this later to be assigned on login.
					$scope.currentUser = $scope.users[0];
					$scope.loginFailed = false;
					$scope.loggedIn = true;
					$scope.show = 'projects';
				}
				else{
					$scope.loginFailed = true;
				}
				
				console.log(data);
			});
		}
		
		$scope.logout = function(){
			$scope.currentUser = null;
			$scope.loggedIn = false;
			$scope.show = 'login';
		}
	
	}).directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                this.select();
            });
        }
    };
});
