//inject the FacebookService into the controller
app.controller('RedesSocialesController', function($scope, $q, TwitterService, FacebookService) {

    $scope.tweets; //array of tweets
    
    TwitterService.initializeTwitter();
    FacebookService.initializeFacebook();
    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
 /*   $scope.refreshTimeline = function() {
        FacebookService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
        });
    }
*/
    $scope.productos = [{ nombre:"Producto1", precio:"3€",facebook:"Joder este producto1 esta de puta madre"},
    { nombre:"Producto2", precio:"3€",facebook:"Joder este producto2 esta de puta madre"}
    ];
    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectTwitterButton = function() {
        TwitterService.connectTwitter().then(function() {
            if (TwitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButtonTwitter').fadeOut(function(){
                    $('#twittear, #signOutTwitter').fadeIn();
                   // $scope.refreshTimeline(); // AL INICIAR PIDE LOS TWITS
                });
            }
        });
    }
  $scope.connectFacebookButton = function() {
        FacebookService.connectFacebook().then(function() {
            if (FacebookService.isReady()) {

                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButtonFacebook').fadeOut(function(){
                    $('#publicar, #signOutFacebook').fadeIn();
                    $scope.loginfacebook = true;
                   // $scope.refreshTimeline(); // AL INICIAR PIDE LOS TWITS
                });
            }
        });
    }
    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOutTwitter = function() {
        TwitterService.clearCacheTwitter();
        //$scope.tweets.length = 0;
        $('#twittear, #signOutTwitter').fadeOut(function(){
            $('#connectButtonTwitter').fadeIn();
        });
    }
     $scope.signOutFacebook = function() {
        FacebookService.clearCacheFacebook();
        //$scope.tweets.length = 0;
        $('#publicar, #signOutFacebook').fadeOut(function(){
            $('#connectButtonFacebook').fadeIn();
        });
    }
    $scope.twittear = function() {
        TwitterService.twittear().then(function(data) {
           // $scope.tweets = data;
        });
    }
    $scope.publicar = function() {
        FacebookService.publicar().then(function(data) {
           // $scope.tweets = data;
        });
    }


    //if the user is a returning user, hide the sign in button and display the tweets
    if (TwitterService.isReady()) {
        $('#connectButtonTwitter').hide();
       $('#twittear, #signOutTwitter').show();
     
    }
      if (FacebookService.isReady()) {

       $('#connectButtonFacebook').hide();
       $('#publicar, #signOutFacebook').show();
       
    }

});