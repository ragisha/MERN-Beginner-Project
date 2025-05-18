let products = [ 
	{id:1, name:'Vivek S', company:'ABC',date:'2020-10-11', city:'abc', country:'India'},
	{id:2, name:'Dev', company:'DEF',date:'2018-09-05', city:'xyz', country:'Canada'},
	{id:3, name:'Ameer', company:'GHI',date:'2000-07-09', city:'lmo', country:'Japan'},
	{id:4, name:'Dian', company:'JKL',date:'2010-12-03', city:'qrs', country:'US'},
	{id:5, name:'Apple', company:'MON',date:'2012-02-12', city:'xyz', country:'India'},
	{id:6, name:'Orange', company:'PQR',date:'2002-05-07', city:'pqr', country:'UK'}
	];

const getProducts = () => (products);

const getNextId = () =>{
    if(products.length < 1) return 1;
    let numArr = products.map((item)=>{return item.id});
    let max = Math.max(...numArr);
    return max+1;
}
const addProduct = (record) => { 
    record.id = getNextId();
    products.push(record);
};
//INSERT INTO product(id,name,company,date,city,country) VALUES ('1','Rahi','Yara','2022-09-01','Chennai','India');
// INSERT INTO product(id,name,company,date,city,country) VALUES ('2','Rahin','Zoho','2025-06-01','Guduvanchery','India');
const updateProduct = (product) => {
    let temp = products.filter((record)=>(product.id == record.id));
    if(temp.length > 0){
        temp[0].name = product.name;
        temp[0].company = product.company;
        temp[0].date = product.date;
        temp[0].city = product.city;
        temp[0].country = product.country;
};
}
const deleteProduct = ({id}) => {
    products = products.filter((record)=>(id != record.id));
};

const getProductById = (id) =>{
    let temp =  products.filter((record)=>(record.id == id));
    if(temp.length > 0){
        return temp[0];
    }else{
        return {}
    }
}

const searchProduct = (fieldName,searchWord) =>{
    console.log("fieldName:"+fieldName);
    console.log("searchWord:"+searchWord);
    let temp =  products.filter((record)=>(record[fieldName].toLowerCase().startsWith(searchWord.toLowerCase())));
    return temp;
}

const sortProduct =(sortBy,asdes)=>{
    sortBy=sortBy;
    asdes=asdes;
    if(asdes=='asc'){
        if(sortBy=='id'){
            products.sort((a,b)=>{
                if(a.id<b.id)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='name'){
            products.sort((a,b)=>{
                if(a.name<b.name)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='company'){
            products.sort((a,b)=>{
                if(a.company<b.company)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='date'){
            products.sort((a,b)=>{
                if(a.date<b.date)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='city'){
            products.sort((a,b)=>{
                if(a.city<b.city)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='country'){
            products.sort((a,b)=>{
                if(a.country<b.country)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
    }
    else{
        if(sortBy=='id'){
            products.sort((a,b)=>{
                if(a.id>b.id)   return -1;
                else if(a.id<b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='name'){
            products.sort((a,b)=>{
                if(a.name>b.name)   return -1;
                else if(a.id<b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='company'){
            products.sort((a,b)=>{
                if(a.company>b.company)   return -1;
                else if(a.id<b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='date'){
            products.sort((a,b)=>{
                if(a.date>b.date)   return -1;
                else if(a.id<b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='city'){
            products.sort((a,b)=>{
                if(a.city>b.city)   return -1;
                else if(a.id<b.id)  return 1;
                return 0;
            });
            return products;
        }
        if(sortBy=='country'){
            products.sort((a,b)=>{
                if(a.country<b.country)   return -1;
                else if(a.id>b.id)  return 1;
                return 0;
            });
            return products;
        }
    }
}

module.exports = {getProducts,addProduct,updateProduct,deleteProduct,getProductById,searchProduct,sortProduct};

