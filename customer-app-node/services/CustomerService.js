let customers = [ 
	{id:1,name:'Vivek S', email:'vivek@abc.com', phone:'8989389333',address:"Singapore",city:"ABC"},
	{id:2,name:'Dev', email:'dev@abc.com', phone:'866u389333',address:"India",city:"XYZ"},
	{id:3,name:'Ameer', email:'ameer@abc.com', phone:'877779333',address:"Asia",city:"PQR"},
	{id:4, name:'Dian', email:'dian@gmail.com', phone:"1234567876", address:'Singapore',city:"MNO"},
	{id:5, name:'Apple', email:'dian@gmail.com', phone:"1234567876", address:'Singapore',city:"LMN"},
	{id:6, name:'Orange', email:'dian@gmail.com', phone:"1234567876", address:'Singapore',city:"ZYX"}
	];

const getCustomers = () => (customers);

const getNextId = () =>{
    if(customers.length < 1) return 1;
    let numArr = customers.map((item)=>{return item.id});
    let max = Math.max(...numArr);
    return max+1;
}
const addCustomer = (record) => { 
    record.id = getNextId();
    customers.push(record);
};

const updateCustomer = (customer) => {
    let temp = customers.filter((record)=>(customer.id == record.id));
    if(temp.length > 0){
        temp[0].name = customer.name;
        temp[0].email = customer.email;
        temp[0].phone = customer.phone;
        temp[0].address = customer.address;
        temp[0].city = customer.city;
};
}
const deleteCustomer = ({id}) => {
    customers = customers.filter((record)=>(id != record.id));
};

const getCustomerById = (id) =>{
    let temp =  customers.filter((record)=>(record.id == id));
    if(temp.length > 0){
        return temp[0];
    }else{
        return {}
    }
}

const searchCustomer = (fieldName,searchWord) =>{
    console.log("fieldName:"+fieldName);
    console.log("searchWord:"+searchWord);
    let temp =  customers.filter((record)=>(record[fieldName].toLowerCase().startsWith(searchWord.toLowerCase())));
    return temp;
}

const sortCustomer = (sortBy,asdes) =>{
     sortBy=sortBy;
    if(asdes.toLowerCase()=='asc'){
		//const customers=getCustomers();
		const temp=customers.sort((a,b)=>{
			var cus1=String(a.sortBy).toLowerCase();
			var cus2=String(b.sortBy).toLowerCase();
			if(cus1<cus2) 	return -1;
			else if(cus1>cus2)	return 1;
			return 0;
		});
        console.log(customers);
		return temp;
	}
	else{
		const temp=customers.sort((a,b)=>{
			var cus1=String(a.sortBy).toLowerCase();
			var cus2=String(b.sortBy).toLowerCase();
			if(cus1>cus2) 	return -1;
			else if(cus1<cus2)	return 1;
			return 0;
		});
        console.log(customers);
		return temp;
	}
}

module.exports = {getCustomers,addCustomer,updateCustomer,deleteCustomer,getCustomerById,searchCustomer,sortCustomer};

