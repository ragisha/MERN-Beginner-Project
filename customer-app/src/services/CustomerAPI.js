const apiEndPoint = 'http://localhost:4000/api/customer'
//const apiEndPoint = "https://nodeapi.pyther.com/customer"

export const getCustomers = async () => {
  return fetch(apiEndPoint, {
   method: 'GET', // or 'PUT'
    headers: {'Content-Type': 'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
    return data;
  }).catch((error) => {
    console.error('Error:', error);
  });
};
export const addCustomer = async (record) =>{
    return fetch(apiEndPoint, {
      method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(record)
      })
    .then(response => response.json())
    .then(response => {
      return response;
  }).catch(function(error) {
    console.log(error);
  });
  }
  export const updateCustomer = async (record) =>{
    return fetch(apiEndPoint, {
      method: 'put',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body:JSON.stringify(record)
      })
    .then(response => response.json())
    .then(response => {
      return response;
  }).catch(function(error) {
    console.log(error);
  });
  } 
  export const deleteCustomer = async (record) =>{
    return fetch(apiEndPoint, {
      method: 'delete',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body:JSON.stringify(record)
      })
    .then(response => response.json())
    .then(response => {
      return response;
  }).catch(function(error) {
    console.log(error);
  });
  }
  export const getCustomerById = async (id) =>{
    return fetch(apiEndPoint + "/"+id, {
      method: 'get',
          headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
    .then(response => response.json())
    .then(response => {
      return response;
  }).catch(function(error) {
    console.log(error);
  });
  }