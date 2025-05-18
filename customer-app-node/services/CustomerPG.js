const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})

const getCustomers = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from customer', function (error, results, fields) {
          if (error) {
            resolve([]);
            throw error;
          }else{
            resolve(results.rows);
          }
        });
    })
}

const addCustomer = function(customer) {
  const text = 'INSERT INTO customer(name, email,phone,address,city) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [customer.name,customer.email,customer.phone,customer.address,customer.city];
  try {
    return pool.query(text, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};

const deleteCustomer = function(id){
  const sql = "delete FROM customer where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
};

const getCustomerById = function(id){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from customer where id='+id, function (error, results, fields) {
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

const updateCustomer = function(customer){
  const sql = 'UPDATE customer set name=$1, email=$2, phone=$3, address=$4, city=$5 WHERE id = $6';
  const values = [customer.name,customer.email,customer.phone,customer.address,customer.city,customer.id];
  try {
    return pool.query(sql, values)
   
  } catch (err) {
    console.log(err.stack)
  }
};

const getCustomersBySearch = function(field,text){
  return new Promise((resolve, reject) => {
  pool.query('SELECT * from customer', function (error, results, fields) {
    if (error) {
      resolve([]);
      throw error;
    }else{
     let tempCustomer=results.rows.filter((record)=>record[field].toLowerCase().startsWith(text.toLowerCase()));
         resolve(tempCustomer);
    }
  });
});

}


module.exports= {getCustomerById,getCustomers,getCustomersBySearch,addCustomer,updateCustomer,deleteCustomer};