angular.module('app.controllers', [])

.controller('signInCtrl', function($scope, $state, $cordovaFacebook){
  $scope.data = {};
  $scope.word = 'Hello'

  $scope.signIn = function(){
    $state.go('signIn') 
  };

  $scope.logIn = function(){
     Parse.User.logIn($scope.data.username, $scope.data.password, {
      success: function(user) {
        console.log(user);
        $state.go('app.menu')
      },
      error: function(user, error) {
        alert("error!");
      }
    });
  };
  $scope.loginFacebook = function(){

  };
  $scope.signupEmail = function(){
    var user = new Parse.User();
    user.set("username", $scope.data.username);
    user.set("password", $scope.data.password);
    user.set("email", $scope.data.email);
   
    // other fields can be set just like with Parse.Object
    user.set("somethingelse", "like this!");
   
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        $state.go('app.menu')
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  $scope.createAccount = function(){
    $state.go('signUp')
  };
})

.controller('appCtrl', function($scope){

})

.controller('profileCtrl', function($scope){

})

.controller('menuCtrl', function($scope, $state, $ionicPlatform, Categories, CartService, BartService){
  $ionicPlatform.ready(function() {
    BartService.initDB();

    // Get all Bart records from the database56\]    BartService.getAllItems().then(function(item) {
      // $scope.order = item;
    });
  
  
  $scope.categories = Categories.all();
  $scope.orderCount = CartService.getCount()
})

.controller('categoryCtrl', function($scope, $state, $stateParams, $ionicModal, Items, Categories, $localstorage, CartService, BartService, $ionicPopup){
  
  $scope.items = Items.get($stateParams.categoryId)
  $scope.category = linearSearch(Categories.all(), $stateParams.categoryId);

  $scope.orderCount = CartService.getCount()

  $ionicModal.fromTemplateUrl('templates/product-detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
  }); 
  $scope.openModal = function(item) {
      $scope.modal.show()
      $scope.item = linearSearch($scope.items, item.id)
      $scope.quantity = 1;
      $scope.total = $scope.item.price;

      $scope.getTotal = function(select, price){
        var total = parseInt(select) * price
        $scope.total = total 
        return total;
      }
    }

  $scope.closeModal = function() {
    resetQuantity()
    $scope.modal.hide();

  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  }); 

  $scope.plusOne = function(){
    $scope.quantity += 1
  }

  $scope.minusOne = function(){
    if ($scope.quantity > 1)
      $scope.quantity -= 1
  }

  $scope.addToOrder = function(item){
    var x = {
      total: $scope.total,
      quantity: $scope.quantity,
      name: item.name,
      price: item.price
    };

    var alertPopup = $ionicPopup.alert({
       title: 'Added to your order!',
       template: 'This will taste good'
    });
     alertPopup.then(function(res) {
       BartService.addItem(x);
        $scope.closeModal()  
     });
  };
  function resetQuantity() {
    $scope.quantity = 1
  }

  function linearSearch(arr,query){
    for (var i = 0; i <arr.length; i++){
      if(arr[i].id == query )
        return arr[i]
    }
  };
})

.controller('cartCtrl', function($scope, $state, CartService, BartService){
  $scope.items;
  var y;
  BartService.getAllItems().then(function(items){
    $scope.items = items
  })
  BartService.getSum().then(function(sum){
    $scope.total = sum;
    console.log($scope.total)
  })
  console.log($scope.items);
  // $scope.total = y.reduce(function(sum, obj) { return sum + obj.total }, 0)

})

.directive('imgCard', function() {
  return function(scope, element, attrs) {
    console.log(attrs.imgCard);
    attrs.$observe('imgCard', function(value) {
        if (value) {
          element.css({
            width: '100%',
            'background-size': 'cover',
            
            'background-image': 'url('+value+')'
          });
        }
      });
  };
});
