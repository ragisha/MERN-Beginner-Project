var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'nodejs'
});

const getTeachers = ()=> {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from teacher', function (error, results, fields) {
         if (error) {
            resolve([]);
            throw error;
          }else{     resolve(results);  
            }        
          });    
        }); 
      }
const getTeachersBySearch = (field,text)=>{
  return new Promise((resolve, reject) => {
    pool.query( "SELECT * FROM teacher", function (error, results, fields) {
      if (error) {
        resolve([]);
        throw error;
      }else{
        let tempteacher=results.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempteacher);
          }
      });
       
  }); }

const addTeacher = (teacher)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("INSERT INTO teacher set ? ",teacher, function(err, results) {
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

const deleteTeacher = (id)=>{
    return new Promise((resolve, reject) => { 
  var sql = "delete FROM teacher where id='"+id+"'";
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
const getTeacherById = (id)=>{
    return new Promise((resolve, reject) => { 
  var record = {};
  var sql = "SELECT * FROM teacher where id='"+id+"'";
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
const updateTeacher = (teacher)=>{
    return new Promise((resolve, reject) => { 
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE teacher set ? WHERE id = ? ",[teacher,teacher.id], function(err, results) {
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


module.exports={getTeacherById,getTeachers,addTeacher,deleteTeacher,updateTeacher,getTeachersBySearch};