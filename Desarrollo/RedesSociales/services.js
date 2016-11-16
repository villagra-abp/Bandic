angular.module('Twitter.services', []).factory('TwitterService', function($q) {

    var authorizationResult = false;

    return {
        initializeTwitter: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('Cfg1UYrM2D2kMI4iVc_lhJHrvOw', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
              
                if (!error) {

                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCacheTwitter: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        twittear: function(){
            var deferred = $q.defer();
            
            var twit = {status:"hola nuevo tweet"};
            var promise = authorizationResult.post('https://api.twitter.com/1.1/statuses/update.json?status='+twit.status ).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                console.log(data);
                alert("Tweet publicado con exito en tu perfil");
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        }

      /*  getLatestTweets: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        }*/
    }
    
});

angular.module('Facebook.services', []).factory('FacebookService', function($q) {

    var authorizationResult = false;

    return {
        initializeFacebook: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('Cfg1UYrM2D2kMI4iVc_lhJHrvOw', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('facebook');

        },
        isReady: function() {
            return (authorizationResult);
        },
        connectFacebook: function() {
            var deferred = $q.defer();
            OAuth.popup('facebook', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present               
                if (!error) {  
                    authorizationResult = result;
                    deferred.resolve();

                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCacheFacebook: function() {
            OAuth.clearCache('facebook');
            authorizationResult = false;
        },
        publicar: function(){
            var deferred = $q.defer();
            var publicacion = {message:"ejemplo publicacion facebook"};
            var promise = authorizationResult.post('me/feed?message='+publicacion.message).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                console.log(data);
                alert("Publicacion publicada con exito en tu perfil");
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
       
        }

    }
    
});


