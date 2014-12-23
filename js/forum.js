var mainModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $timeout, $http){
		$scope.currentProject = null;
		$scope.currentThread = null;
		$scope.show = "login";
		$scope.newProjectName = "";
		$scope.newThreadSubject = "";
		$scope.newThreadMessage = "";
		$scope.newPost = "";
		
		function newID(){
			return ((new Date).getTime() + "").substr(3) + Math.floor(100000 * Math.random());
		}
		
		$scope.openThreads = function(project){
			$scope.show = "threads"; 
			$scope.currentProject = project; 
		}
		
		$scope.openPosts = function(thread){
			$scope.show = "posts";
			$scope.currentThread = thread;
		}
		
		$scope.createProject = function(){
			var tempID = newID();
			
			$scope.projects.push({id: tempID, name: $scope.newProjectName, threads: []});
			
			var stringifiedPost = JSON.stringify({id: tempID, name: $scope.newProjectName});
			$http({method: "POST", url: serverURL + "projects", data: stringifiedPost});
			
			$scope.newProjectName = "";
			$scope.show="projects";
		}
		
		$scope.createThread = function(){
			var threadID = newID();
			var postID = newID();
			
			$scope.currentProject.threads.push({
				id: $scope.currentProject.threads.length,
				subject: $scope.newThreadSubject,
				posts: [{id: threadID, userID: $scope.currentUser.id, message: $scope.newThreadMessage}]
			});
			
			var stringifiedThread = JSON.stringify({id: $scope.projects.length, projectID: $scope.currentProject.id, subject: $scope.newThreadSubject});
			$http({method: "POST", url: serverURL + "threads", data: stringifiedThread})
			
			var stringifiedPost = JSON.stringify({id: postID, userID: $scope.currentUser.id, threadID: threadID, projectID: $scope.currentProject.id, message: $scope.newThreadMessage});
			$http({method: "POST", url: serverURL + "posts", data: stringifiedPost});
			
			$scope.newThreadSubject = "";
			$scope.newThreadMessage = "";
			$scope.show="threads";
		}
		
		$scope.sendPost = function(){
			var postID = newID();
			
			$scope.currentThread.posts.push({
				id: postID,
				userID: $scope.currentUser.id,
				projectID: $scope.currentProject.id,
				message: $scope.newPost
			});
			
			var stringifiedPost = JSON.stringify({id: postID, userID: $scope.currentUser.id, threadID: $scope.currentThread.id, projectID: $scope.currentProject.id, message: $scope.newThreadMessage});
			$http({method: "POST", url: serverURL + "posts", data: stringifiedPost});
			
			$scope.newPost= "";
		}
		
		$scope.users = [];
		
		$scope.getItemFromID = function(array, id)
		{
			for(var i = 0; i < array.length; i++){
				if(array[i].id == id){
					return array[i];
				}
			}
			return false;
		};
		
		$scope.getIndexFromID = function(array, id)
		{
			for(var i = 0; i < array.length; i++){
				if(array[i].id == id){
					return i;
				}
			}
			return false;
		};
		
		$scope.projects = [];
		
		$scope.getAllPosts = function(){
			var additionalPosts = [];
			$http({method: "GET", url: serverURL + "posts"})
				.success(function(data, status){
					additionalPosts = data;
					console.log("Additional posts: " + additionalPosts);
				
				for(var i = 0; i < additionalPosts.length; i++){
					var relevantProject = $scope.getItemFromID($scope.projects, additionalPosts[i].projectID);
					var relevantThreadIndex = $scope.getIndexFromID(relevantProject[$scope.getIndexFromID(relevantProject.threads, additionalPosts[i].threadID)]);
					relevantProject.threads[relevantThreadIndex].posts.push(additionalPosts[i]);
				}
			})
			.error(function(data, status){
				additionalPosts = data || "Request failed";
				console.log(additionalPosts);
			});
		}
		
		$scope.getAllThreads = function(){
			var additionalThreads = [];
			
			$http({method: "GET", url: serverURL + "threads"})
			.success(function(data, status){
				additionalThreads = data;
				console.log("Additional threads: " + additionalThreads)
				for(var i = 0; i < additionalThreads.length; i++){
					additionalThreads[i].posts = [];
					var relevantProject = $scope.getItemFromID($scope.projects, additionalThreads[i].projectID)
					.threads.push(additionalThreads[i]);
				}
				$scope.getAllPosts();
			}).error(function(data, status){
				console.log("Threads Fail");	
			});
		}
		
		$scope.getAllData = function(){
			var additionalProjects = [];
			
			$http({method: "GET", url: serverURL + "projects"})
			.success(function(data, status){
				additionalProjects = data;
				console.log("Additional projects: " + additionalProjects)
				for(var i = 0; i < additionalProjects.length; i++){
					additionalProjects[i].threads = [];
					$scope.projects.push(additionalProjects[i]);
				}
				$scope.getAllThreads();
			}).error(function(data, status){
				console.log("Threads Fail");	
			});
		}
		
		$scope.getAllData();
		
		$scope.currentUser = null;
		$scope.loggedIn = false;
		$scope.loginFailed = false;
		
		$scope.loginName = "";
		$scope.loginPass = "";
	
		$scope.login = function(){
			if($scope.loginName == "" || $scope.loginPass==""){ $scope.loginFailed = true; return; }
			
			var stringifiedPost = JSON.stringify({userName: $scope.loginName, password: $scope.loginPass});
			$http({method: "POST", url: serverURL + "login", data: stringifiedPost}).success(function(data, status){
				if(data){
					//todo: change this later to be assigned on login.
					$scope.currentUser = $scope.getItemFromID($scope.users, data.id);
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
