var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'nodejs'
});

const getSubjects = ()=> {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from subject', function (error, results, fields) {
         if (error) {
            resolve([]);
            throw error;
          }else{     resolve(results);  
            }        
          });    
        }); 
      }
const getSubjectsBySearch = (field,text)=>{
  return new Promise((resolve, reject) => {
    pool.query( "SELECT * FROM subject", function (error, results, fields) {
      if (error) {
        resolve([]);
        throw error;
      }else{
        let tempSubject=results.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempSubject);
          }
      });
       
  }); }

const addSubject = (subject)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("INSERT INTO subject set ? ",subject, function(err, results) {
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

const addInter = (subject)=> {
  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
      if(err) { console.log(err); resolve({result:"fail"}); return; }
      connection.query("INSERT INTO substud set ? ",subject, function(err, results) {
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

const addStaff = (subject)=> {
  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
      if(err) { console.log(err); resolve({result:"fail"}); return; }
      connection.query("INSERT INTO subteach set ? ",subject, function(err, results) {
        console.log(subject);
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

const deleteSubject = (id)=>{
    return new Promise((resolve, reject) => { 
  var sql = "delete FROM subject where id='"+id+"'";
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
const getSubjectById = (id)=>{
    return new Promise((resolve, reject) => { 
  var record = {};
  var sql = "SELECT * FROM subject where id='"+id+"'";
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
const updateSubject = (subject)=>{
    return new Promise((resolve, reject) => { 
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE subject set ? WHERE id = ? ",[subject,subject.id], function(err, results) {
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

// const doCheck=(pids,subids)=>{
//   // const pids=getSubjectById(pid);
//   // const subids=getStudentById(subid);
//   if(pids>0 && subids>0){
//     return new Promise((resolve, reject) => {
//       pool.getConnection(function(err, connection) {
//       if(err) { console.log(err); resolve({result:"fail"}); return; }
//       connection.query("INSERT INTO substud set sid='"+pid+"',subid='"+subid+"'", function(err, results) {
//         if(err){
//          console.log("Error Selecting : %s ",err );
//          resolve({result:"fail"});
//         }else{
//           resolve({result:"success"});
//        }
//     });
//   });
// });
//   }
// }


module.exports={getSubjectById,getSubjects,addSubject,deleteSubject,updateSubject,getSubjectsBySearch,addInter,addStaff};