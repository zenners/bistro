angular.module('app.services', [])

.factory('Categories', function(){
	var categories = [
	{name:'Breakfast', id:1, backgroundImage: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/NS5Q6MVMZQ.jpg'},
	{name:'Lunch', id:2, backgroundImage: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/ZYTEIVC1XJ.jpg'},
	{name:'Dinner', id:3, backgroundImage:'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/PMLNPBT2T9.jpg'},
	{name:'Specials', id:4, backgroundImage: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/L1S7QIJIAT.jpg'},
	{name:'Drinks', id:5, backgroundImage:'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/HWFUPZEHMO.jpg'},
	];

	return {
	    all: function() {
	      return categories;
    	}
	}
})

.factory('Items', function(){
	var menu = [
		{
			id: 0,
			name: 'Steak & Eggs',
			description: 'Sirloin steak and your choice of eggs',
			price: '7.99',
			imgUrl: 'http://media2.popsugar-assets.com/files/2010/07/29/5/192/1922195/0b889488b993f126_FNM060109Grilling010_s4x3_lg/i/Food-Network-Recipe-Grilled-Steak-Eggs-Beer-Molasses.jpg',
			categoryId: 1
		},
		{
			id: 1,
			name: 'Ham & Eggs',
			price: '6.99',
			description: 'Honey roasted ham and your choice of eggs',
			imgUrl: 'http://onehungrymama.com/wp-content/uploads/2010/06/ham-eggs-polenta.jpg',
			categoryId: 1
		},
		{
			id: 2,
			name: 'Bacon & Eggs',
			price: '5.99',
			description: 'Crispy bacon and your choice of eggs',
			imgUrl: 'http://www.walthampton.com/wp-content/uploads/2014/01/bacon-and-eggs.jpg',
			categoryId: 1
		},
		{
			id: 3,
			name: 'Cereal',
			price: '1.99',
			description: 'Cornflakes and your choice of milk',
			imgUrl: 'http://i.cdn.turner.com/cnn/2011/HEALTH/03/22/cereal.ward.off.hypertension/t1larg.cereal.ward.off.hypertension.jpg',
			categoryId: 1
		},
		{
			id: 4,
			name: 'Cheeseburger & Fries',
			price: '70.99',
			description: 'Cheeseburger cooked and hand cut fries',
			imgUrl: 'http://foundational-fitness.com/wp-content/uploads/2014/03/burger.jpg',
			categoryId: 2
		},
		{
			id: 5,
			name: 'Turkey Bacon Sandwich',
			price: '17.99',
			description: 'Garlic turkey breast with BLT',
			imgUrl: 'http://food-management.com/site-files/food-management.com/files/imagecache/medium_img/uploads/2012/07/roasted-turkyey-and-bacon-club-promo.jpg',
			categoryId: 2
		},
		{
			id: 6,
			name: 'Beef Burrito',
			price: '8.99',
			description: 'Sirloin steak burrito with black beans',
			imgUrl: 'http://herviewfromhome.com/wp-content/uploads/2013/03/Omaha-Steaks_Cajun-Beef-Burrito.jpg',
			categoryId: 2
		},
		{
			id: 7,
			name: 'Filet Minion',
			price: '6.99',
			description: '3 Filet Minions, despicable',
			imgUrl: 'http://i.imgur.com/lnJKY8w.jpg',
			categoryId: 3
		},
		{
			id: 8,
			name: 'Roasted Chicken',
			price: '5.99',
			description: 'Tender juicy roasted chicken served with oven baked potatoes',
			imgUrl: 'http://4.bp.blogspot.com/-BGFf3IMIu38/Tx3R64MAl3I/AAAAAAAAFOI/3uVZ2d3NOdY/s1600/Five-Spice-Roasted-Chicken-Legs.jpg',
			categoryId: 3
		},
		{
			id: 9,
			name: 'Kale Salad',
			price: '2.99',
			description: 'Kale salad served with no dressing',
			imgUrl: 'http://www.gimmesomeoven.com/wp-content/uploads/2014/01/Kale-Cranberry-Salad-1.jpg',
			categoryId: 3
		},
			{
			id: 10,
			name: '10pc Fried Chicken',
			price: '4.99',
			description: 'All dark meat chicken bucket with mashed potato and coleslaw',
			imgUrl: 'http://www.gianteagle.com/ProductImages/OWN_BRANDS/GIANT_EAGLE/8_Piece_Chicken.png',
			categoryId: 4
		},
			{
			id: 11,
			name: 'Rack of Lamb',
			price: '27.99',
			description: "Pistachio crusted rack of lamb",
			imgUrl:'http://i.ytimg.com/vi/6S8aa51Yyso/hqdefault.jpg',
			categoryId: 4
		},
			{
			id: 12,
			name: 'California Roll',
			price: '17.99',
			description: 'Special california roll',
			imgUrl: 'http://www.angsarap.net/wp-content/uploads/2011/09/california-roll-1.jpg',
			categoryId: 4
		},

	];

	return {
		get: function(categoryId){
			var x = menu.filter(function (item){
				if (item.categoryId == categoryId){
					return item
				}
			})
			return x
		}
	}
})

.factory('CartService', function(){
  var service = this;
  service.products = [];
  service.cart_product_id = 0;
  service.total = 0;
  service.add = add;
  service.remove = remove;
  service.getProducts = getProducts
  service.getCount = getCount;
  service.getTotal = getTotal

  function add(product){
    service.products.push(product);
    console.log(service.products)
    console.log(getCount())
  }

  function getProducts(){
  	var foo = service.products
  	return foo
  }

  function remove(product){
  	service.products = service.products.filter(function (el) { return el !== product; });
    service.total -= parseFloat(product.price);
  }

  function getTotal(){
  	var total = service.products.reduce(function(sum, obj) {return sum + obj.total; }, 0);
  	service.total = total
  	return service.total
  }

  function getCount(){
  	var y =  service.products.reduce(function(acc, obj) { return acc + obj.quantity; }, 0);
  	return y
  }

  return service
})

.factory('BartService', ['$q', function($q){
	var _db;    
    var _items;
    var cartTotal;

        return {
            initDB: initDB,
     
            getAllItems: getAllItems,
            addItem: addItem,
            getSum: getSum,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        function initDB() {
            // Creates the database or opens if it already exists
            _db = new PouchDB('cart', {adapter: 'websql'});
        };

        function addItem(item) {
            return $q.when(_db.post(item));
        };

        function updateItem(item) {
            return $q.when(_db.put(item));
        };

        function deleteItem(item) {
            return $q.when(_db.remove(item));
        };

        function getSum(){
        	var myMapReduceFun = {
			  map: function (doc) {
			    emit(doc.total);
			  },
			  reduce: '_sum'
			};
        	return $q.when(_db.query(myMapReduceFun, {reduce: true, group:true, group_level: 1}));
        };

        function getAllItems() {

            if (!_items) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {

                            // Each row has a .doc object and we just want to send an 
                            // array of item objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _items = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                row.doc.Date = new Date(row.doc.Date);
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onDatabaseChange);

                           return _items;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_items);
            }
        };

        function onDatabaseChange(change) {
            var index = findIndex(_items, change.id);
            var item = _items[index];

            if (change.deleted) {
                if (item) {
                    _items.splice(index, 1); // delete
                }
            } else {
                if (item && item._id === change.id) {
                    _items[index] = change.doc; // update
                } else {
                    _items.splice(index, 0, change.doc) // insert
                }
            }
        }
        
        function findIndex(array, id) {
          var low = 0, high = array.length, mid;
          while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
          }
          return low;
        }	
}])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

