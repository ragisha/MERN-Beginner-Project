var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'nodejs'
});

const getCustomers = ()=> {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from customer', function (error, results, fields) {
         if (error) {
            resolve([]);
            throw error;
          }else{     resolve(results);  
            }        
          });    
        }); 
      }
const getCustomersBySearch = (field,text)=>{
  return new Promise((resolve, reject) => {
    pool.query( "SELECT * FROM customer", function (error, results, fields) {
      if (error) {
        resolve([]);
        throw error;
      }else{
        let tempCustomer=results.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempCustomer);
          }
      });
       
  }); }

const addCustomer = (customer)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("INSERT INTO customer set ? ",customer, function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail"});
          }else{
            resolve({result:"success"});
         }
      });
    });
});
};

const deleteCustomer = (id)=>{
    return new Promise((resolve, reject) => { 
  var sql = "delete FROM customer where id='"+id+"'";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); resolve({result:"fail"}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); resolve({result:"fail"}); return; }
      resolve({result:"success"});
    });
});
  });
};
const getCustomerById = (id)=>{
    return new Promise((resolve, reject) => { 
  var record = {};
  var sql = "SELECT * FROM customer where id='"+id+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); resolve({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); resolve({}); return; }
      if(results.length == 0){
        resolve(record);
      }
      resolve(results[0]);
    });
  });
});
};
const updateCustomer = (customer)=>{
    return new Promise((resolve, reject) => { 
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail"});
          }else{
            resolve({result:"success"});
         }
      });
    });
});
};

// const getCustomersBySearch = (field,text)=>{
//     return new Promise((resolve, reject) => { 
//       var sql = "SELECT * FROM customer where ((name='"+field+"' AND searchText LIKE '"+text+"%') OR (email='"+field+"' AND searchText LIKE '"+text+"%') OR (phone='"+field+"' AND searchText LIKE '"+text+"%')  OR (address='"+field+"' AND searchText LIKE '"+text+"%') OR (city='"+field+"' AND searchText LIKE '"+text+"%'))";
//       console.log("sql:"+sql);
//       pool.getConnection(function(err, connection) {
//         if(err) { console.log(err); resolve({}); return; }
//         connection.query(sql, function(err, results) {
//           connection.release();
//           if(err) { console.log(err); resolve({}); return; }
//           if(results.length == 0){
//             resolve(record);
//           }
//           resolve(results);
//         });
        
//       });
// });
  
//}


module.exports={getCustomerById,getCustomers,addCustomer,deleteCustomer,updateCustomer,getCustomersBySearch};