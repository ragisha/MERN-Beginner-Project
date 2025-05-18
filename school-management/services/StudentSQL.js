var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'nodejs'
});

const getStudents = ()=> {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from student', function (error, results, fields) {
         if (error) {
            resolve([]);
            throw error;
          }else{     resolve(results);  
            }        
          });    
        }); 
      }
const getStudentsBySearch = (field,text)=>{
  return new Promise((resolve, reject) => {
    pool.query( "SELECT * FROM student", function (error, results, fields) {
      if (error) {
        resolve([]);
        throw error;
      }else{
        let tempstudent=results.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempstudent);
          }
      });
       
  }); }

const addStudent = (student)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("INSERT INTO student set ? ",student, function(err, results) {
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

const deleteStudent = (id)=>{
    return new Promise((resolve, reject) => { 
  var sql = "delete FROM student where id='"+id+"'";
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
const getStudentById = (id)=>{
    return new Promise((resolve, reject) => { 
  var record = {};
  var sql = "SELECT * FROM student where id='"+id+"'";
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

const getCourseById = (id)=>{
  return new Promise((resolve, reject) => { 
var record = {};
var sql = "SELECT * FROM substud where sid='"+id+"'";
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

const updateStudent = (student)=>{
    return new Promise((resolve, reject) => { 
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE student set ? WHERE id = ? ",[student,student.id], function(err, results) {
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


module.exports={getStudentById,getStudents,addStudent,deleteStudent,getCourseById,updateStudent,getStudentsBySearch};