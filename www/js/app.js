angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'app.services', 'ngCordova'])

.run(function($ionicPlatform) {
  Parse.initialize("XhZyPgGbXBuD6wdr2YRJWweWw0v89W77ea4B5cWf", "XjZotw4TvqdSYU6XUNVbGvi6KSxBp38c0AR5MWLw");
  
  
    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '1116254258403994', 
            version    : 'v2.4',
            xfbml      : true
        });
    };
   
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    //login reg pages
    .state('landing', {
      url: '',
      templateUrl: 'templates/landing.html',
      controller: 'signInCtrl'
    })
    .state('signIn', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'signInCtrl'
    })
    .state('signUp',{
        url:'/sign-up',
        templateUrl: 'templates/sign-up.html',
        controller: 'signInCtrl'
    })
    // start of app
    .state('app', {
      url: '/app',
      abstract:true,
      templateUrl: 'templates/side-menu.html'
    })

    .state('app.menu', {
      url: '/menu',
      views: {
        'menuContent' :{
          templateUrl: 'templates/menu.html',
          controller: 'menuCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
    .state('app.cart', {
      url:'/cart',
      views:{
        'menuContent': {
          templateUrl: 'templates/cart.html',
          controller: 'cartCtrl'
        }
      }
    })
    .state('app.category', {
      url: '/category/:categoryId',
      views: {
        'menuContent':{
           templateUrl: 'templates/menu-list.html',
           controller: 'categoryCtrl'
        }
      }
     
    });

  $urlRouterProvider.otherwise('/landing');
  

});
