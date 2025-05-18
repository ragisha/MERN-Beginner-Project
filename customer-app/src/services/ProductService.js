let products = [ 
	{id:1,name:'Bottle',company:'Bisleri', code:'bottle@bisleri.com',date:'2022-09-01',city:'Bangalore',country:'India'},
	{id:2,name:'Pen',company:'Cello', code:'pen@Cello.com',date:'2022-08-01',city:'Chennai',country:'India'},
	{id:3,name:'Eraser',company:'Natraj', code:'eraser@natraj.com',date:'2022-09-02',city:'Mumbai',country:'India'},
	{id:4,name:'Watch',company:'Fossil', code:'watch@Fossil.com',date:'2020-08-06',city:'Bangalore',country:'India'},
	{id:5,name:'HeadSet',company:'Boat', code:'headset@boat.com',date:'2020-08-08',city:'Bangalore',country:'India'}
	];	
    const getProducts = () => (products);
    const getNextId = () =>{
        if(products.length < 1){
         return 1;
        }
        let numArray = products.map((item)=>{return item.id});
        let max = Math.max(...numArray);
        return max + 1;
     }
    const addProduct = (record) => {
        record.id = getNextId();
        products.push(record);
    };
    const updateProduct = (product) => {
        let temp = products.filter((record)=>(product.id == record.id));
        if(temp.length > 0){
            temp[0].name = product.name;
            temp[0].company = product.company;
            temp[0].code = product.code;
            temp[0].date = product.date;
            temp[0].city = product.city;
            temp[0].country = product.country;
    };}
    const deleteProduct = ({id}) => {
        products = products.filter((record)=>(id != record.id));
    };
    const getProductById = (id) =>{
        let temp =  products.filter((record)=>(record.id == id));
        if(temp.length > 0){
            return temp[0];
        }else{
            return {};
        }}
    const sortProduct = (field,fieldOrder) =>{
        field=field;
        fieldOrder=fieldOrder;
        if(fieldOrder=='asc'){ 
            if(field=='id'){
                products.sort((a,b)=>{
                    if(a.id < b.id){
                        return -1;    
                    }
                    if(a.id>b.id){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field=='name'){
                products.sort((a,b)=>{
                    if(a.name < b.name){
                        return -1;    
                    }
                    if(a.name>b.name){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field=='company'){
                products.sort((a,b)=>{
                    if(a.company < b.company){
                        return -1;    
                    }
                    if(a.company>b.company){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field=='code'){
                products.sort((a,b)=>{
                    if(a.code < b.code){
                        return -1;    
                    }
                    if(a.code>b.code){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field==''){
                products.sort((a,b)=>{
                    if(a.company < b.company){
                        return -1;    
                    }
                    if(a.company>b.company){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field=='city'){
                products.sort((a,b)=>{
                    if(a.city < b.city){
                        return -1;    
                    }
                    if(a.city>b.city){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
            if(field=='country'){
                products.sort((a,b)=>{
                    if(a.country < b.country){
                        return -1;    
                    }
                    if(a.country>b.country){
                        return 1;
                    }
                    return {};
                })
                return products;  
            }
        }else{
            if(field=='id'){
                products.sort((a,b)=>{
                    if(a.id > b.id){
                        return -1;    
                    }
                    if(a.id<b.id){
                        return 1;
                    }
                    return {};
                })
                return products; }
            if(field=='name'){
            products.sort((a,b)=>{
                if(a.name > b.name){
                    return -1;    
                }
                if(a.name<b.name){
                    return 1;
                }
                return {};
            })
            return products;  
        }
        if(field=='company'){
            products.sort((a,b)=>{
                if(a.company > b.company){
                    return -1;    
                }
                if(a.company<b.company){
                    return 1;
                }
                return {};
            })
            return products;  
        }
        if(field=='code'){
            products.sort((a,b)=>{
                if(a.code > b.code){
                    return -1;    
                }
                if(a.code<b.code){
                    return 1;
                }
                return {};
            })
            return products;  
        }
        if(field=='date'){
            products.sort((a,b)=>{
                if(a.date > b.date){
                    return -1;    
                }
                if(a.date<b.date){
                    return 1;
                }
                return {};
            })
            return products;  
        }
        if(field=='city'){
            products.sort((a,b)=>{
                if(a.city > b.city){
                    return -1;    
                }
                if(a.city<b.city){
                    return 1;
                }
                return {};
            })
            return products;  
        }
        if(field=='country'){
            products.sort((a,b)=>{
                if(a.country > b.country){
                    return -1;    
                }
                if(a.country<b.country){
                    return 1;
                }
                return {};
            })
            return products;  
        }}}
    const searchProduct = (fieldName,searchWord) =>{
        let temp =  products.filter((record)=>(record[fieldName].toLowerCase().startsWith(searchWord.toLowerCase())));
            return temp;} 
    module.exports = {getProducts,addProduct,updateProduct,deleteProduct,getProductById, searchProduct, sortProduct};
    