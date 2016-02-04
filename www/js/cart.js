// (function() {

//     angular.module('app.services').factory('BartService', ['$q', BartService]);

//     function BartService($q) {  
//         var _db;    
//         var _items;

//         return {
//             initDB: initDB,

//             getAllitems: getAllitems,
//             additem: additem,
//             updateitem: updateitem,
//             deleteitem: deleteitem
//         };

//         function initDB() {
//             // Creates the database or opens if it already exists
//             _db = new PouchDB('items', {adapter: 'websql'});
//         };

//         function additem(item) {
//             return $q.when(_db.post(item));
//         };

//         function updateitem(item) {
//             return $q.when(_db.put(item));
//         };

//         function deleteitem(item) {
//             return $q.when(_db.remove(item));
//         };

//         function getAllitems() {

//             if (!_items) {
//                 return $q.when(_db.allDocs({ include_docs: true}))
//                           .then(function(docs) {

//                             // Each row has a .doc object and we just want to send an 
//                             // array of item objects back to the calling controller,
//                             // so let's map the array to contain just the .doc objects.
//                             _items = docs.rows.map(function(row) {
//                                 // Dates are not automatically converted from a string.
//                                 row.doc.Date = new Date(row.doc.Date);
//                                 return row.doc;
//                             });

//                             // Listen for changes on the database.
//                             _db.changes({ live: true, since: 'now', include_docs: true})
//                                .on('change', onDatabaseChange);

//                            return _items;
//                          });
//             } else {
//                 // Return cached data as a promise
//                 return $q.when(_items);
//             }
//         };

//         function onDatabaseChange(change) {
//             var index = findIndex(_items, change.id);
//             var item = _items[index];

//             if (change.deleted) {
//                 if (item) {
//                     _items.splice(index, 1); // delete
//                 }
//             } else {
//                 if (item && item._id === change.id) {
//                     _items[index] = change.doc; // update
//                 } else {
//                     _items.splice(index, 0, change.doc) // insert
//                 }
//             }
//         }
        
//         function findIndex(array, id) {
//           var low = 0, high = array.length, mid;
//           while (low < high) {
//             mid = (low + high) >>> 1;
//             array[mid]._id < id ? low = mid + 1 : high = mid
//           }
//           return low;
//         }
//     }
// })();