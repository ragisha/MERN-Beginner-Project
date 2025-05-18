let customers = [ 
	{id:1,name:'Vivek', email:'vivek@abc.com', phone:'8989389333',address:"Singapore",city:"Queenstown"},
	{id:2,name:'Dev', email:'dev@abc.com', phone:'866u389333',address:"India",city:"Bangalore"},
	{id:3,name:'Ameer', email:'ameer@abc.com', phone:'877779333',address:"India",city:"Mumbai"},
	{id:4, name:'Dian', email:'dian@gmail.com', phone:"1234567876", address:'Singapore',city:"Queenstown"},
	{id:5, name:'Reshmi', email:'resh@gmail.com', phone:"1234567876", address:'India',city:"Chennai"},
	{id:6, name:'Riya', email:'riya@gmail.com', phone:"1234567876", address:'Singapore',city:"Queenstown"}
	];
    export  const getCustomers = () => (customers);
    const getNextId = () =>{
       if(customers.length < 1){
        return 1;
       }
       let numArray = customers.map((item)=>{return item.id});
       let max = Math.max(...numArray);// ... is spreading the array(5,6,6)
       return max + 1;
    }
    export const addCustomer = (record) => {
        record.id = getNextId();
        customers.push(record);
        return [...customers];
    };
    export const updateCustomer = (customer) => {
        let temp = customers.filter((record)=>(customer.id == record.id));
        if(temp.length > 0){
            temp[0].name = customer.name;
            temp[0].email = customer.email;
            temp[0].phone = customer.phone;
            temp[0].address = customer.address;
            temp[0].city = customer.city;
    };
    }
    export const deleteCustomer = ({id}) => {
        customers = customers.filter((record)=>(id != record.id));
    };
    export const getCustomerById = (id) =>{
        let temp =  customers.filter((record)=>(record.id == id));
        if(temp.length > 0){
            return temp[0];
        }else{
            return {};
        }
    }
    export const sortCustomer = (field,fieldOrder) =>{
        field=field;
        fieldOrder=fieldOrder;
        if(fieldOrder=='asc'){
            if(field=='id'){
                customers.sort((a,b)=>{
                    if(a.id < b.id){
                        return -1;    
                    }
                    if(a.id>b.id){
                        return 1;
                    }
                    return {};
                })
                return customers;  
            }
            if(field=='name'){
            customers.sort((a,b)=>{
                if(a.name < b.name){
                    return -1;    
                }
                if(a.name>b.name){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
        if(field=='email'){
            customers.sort((a,b)=>{
                if(a.email < b.email){
                    return -1;    
                }
                if(a.email>b.email){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
        if(field=='phone'){
            customers.sort((a,b)=>{
                if(a.phone < b.phone){
                    return -1;    
                }
                if(a.phone>b.phone){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
        if(field=='address'){
            customers.sort((a,b)=>{
                if(a.address < b.address){
                    return -1;    
                }
                if(a.address>b.address){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
        if(field=='city'){
            customers.sort((a,b)=>{
                if(a.city < b.city){
                    return -1;    
                }
                if(a.city>b.city){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
    }else{
        if(field=='id'){
            customers.sort((a,b)=>{
                if(a.id > b.id){
                    return -1;    
                }
                if(a.id<b.id){
                    return 1;
                }
                return {};
            })
            return customers;  
        }
        if(field=='name'){
            customers.sort((a,b)=>{
            if(a.name > b.name){
                return -1;    
            }
            if(a.name<b.name){
                return 1;
            }
            return {};
        })
        return customers;  
    }
    if(field=='email'){
        customers.sort((a,b)=>{
            if(a.email > b.email){
                return -1;    
            }
            if(a.email<b.email){
                return 1;
            }
            return {};
        })
        return customers;  
    }
    if(field=='phone'){
        customers.sort((a,b)=>{
            if(a.phone > b.phone){
                return -1;    
            }
            if(a.phone<b.phone){
                return 1;
            }
            return {};
        })
        return customers;  
    }
    if(field=='address'){
        customers.sort((a,b)=>{
            if(a.address > b.address){
                return -1;    
            }
            if(a.address<b.address){
                return 1;
            }
            return {};
        })
        return customers;  
    }
    if(field=='city'){
        customers.sort((a,b)=>{
            if(a.city > b.city){
                return -1;    
            }
            if(a.city<b.city){
                return 1;
            }
            return {};
        })
        return customers;  
    }
}
    }
   export const searchCustomer = (fieldName,searchWord) =>{
        console.log("fieldName:"+fieldName);
        console.log("searchWord:"+searchWord);
        let temp =  customers.filter((record)=>(record[fieldName].toLowerCase().startsWith(searchWord.toLowerCase())));
            return temp;
    }
   