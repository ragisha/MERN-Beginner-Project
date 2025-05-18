var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'nodejs'
});
var gid=3;
const getProducts = ()=> {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from product', function (error, results, fields) {
         if (error) {
            resolve([]);
            throw error;
          }else{     resolve(results);          }        });    }); }

const getProductsBySearch = (field,text)=>{
            return new Promise((resolve, reject) => {
          
              pool.query( "SELECT * FROM product where ?? LIKE ? ? ",[field,text,'%'], function (error, results, fields) {
                if (error) {
                  resolve([]);
                  throw error;
                }else{     resolve(results);          }        });
                 
            }); }

const addProduct = (product)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("INSERT INTO product set ? ",product, function(err, results) {
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
//,`name` varchar(200) NOT NULL,`company` varchar(200) NOT NULL,`date` varchar(200) NOT NULL,`city` varchar(200),`country` varchar(200)) ENGINE=InnoDB DEFAULT CHARSET=latin1
//INSERT INTO product(name,company,date,city,country) VALUES ('Sebin','XYZ','2022-07-04','Guindy','Chennai');
const deleteProduct = (id)=>{
    return new Promise((resolve, reject) => { 
  var sql = "delete FROM product where id='"+id+"'";
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
const getProductById = (id)=>{
    return new Promise((resolve, reject) => { 
  var record = {};
  var sql = "SELECT * FROM product where id='"+id+"'";
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
const updateProduct = (product)=>{
    return new Promise((resolve, reject) => { 
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE product set ? WHERE id = ? ",[product,product.id], function(err, results) {
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

// const getProductsBySearch = (field,text)=>{
//     return new Promise((resolve, reject) => { 
//       var sql = "SELECT * FROM product where ((name='"+field+"' AND searchText LIKE '"+text+"%') OR (email='"+field+"' AND searchText LIKE '"+text+"%') OR (phone='"+field+"' AND searchText LIKE '"+text+"%')  OR (address='"+field+"' AND searchText LIKE '"+text+"%') OR (city='"+field+"' AND searchText LIKE '"+text+"%'))";
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


module.exports={getProductById,getProducts,addProduct,deleteProduct,updateProduct,getProductsBySearch};