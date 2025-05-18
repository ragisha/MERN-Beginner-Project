const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})

const getStudents = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from student', function (error, results, fields) {
          if (error) {
            resolve([]);
            throw error;
          }else{
            resolve(results.rows);
          }
        });
    })
}

const addStudent = function(student) {
  const text = 'INSERT INTO student(sname,semail,sphone) VALUES($1, $2, $3) RETURNING *';
  const values = [student.sname,student.semail,student.sphone];
  console.log(values)
  try {
    return pool.query(text, values)
  } catch (err) {
    console.log(err.stack)
  }
};

const deleteStudent = function({id}){
  return new Promise((resolve, reject) => {
  const sql = "delete FROM customer where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
});
};

const getStudentById = function(sid){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from student where sid='+sid, function (error, results, fields) {
          if (error) {
            resolve({});
            throw error;
          }else{
            if(results.rows.length > 0){
              resolve(results.rows[0]);
            }else{
              resolve({});
            } 
          }
        });
    })
};

const updateStudent = function(student){
  const sql = 'UPDATE student set sname=$1, semail=$2, sphone=$3 WHERE sid = $4';
  const values = [student.sname,student.semail,student.sphone,student.sid];
  try {
    return pool.query(sql, values)
   
  } catch (err) {
    console.log(err.stack)
  }
};

const getStudentsBySearch = function(field,text){
  return new Promise((resolve, reject) => {
  pool.query('SELECT * from student', function (error, results, fields) {
    if (error) {
      resolve([]);
      throw error;
    }else{
     let tempstudent=results.rows.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempstudent);
    }
  });
});

}


module.exports= {getStudentById,getStudents,getStudentsBySearch,addStudent,updateStudent,deleteStudent};