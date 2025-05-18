var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'nodejs'
});
 
connection.connect();
 
connection.query('SELECT * from customer', function (error, results, fields) {
  if (error) throw error;
  for (var i = 0; i < results.length; i++) {
  	console.log('Name is: ', results[i].name);
  }
  
});
 
connection.end(); 
