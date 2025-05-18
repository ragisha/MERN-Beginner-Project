var express = require('express');
var router = express.Router();
//const {getCustomers, updateCustomer, addCustomer, deleteCustomer,getCustomerById,searchCustomer,sortCustomer} = require('../services/CustomerService');
const {getCustomerById,getCustomers,addCustomer,deleteCustomer,updateCustomer,getCustomersBySearch} = require('../services/CustomerMySQL');
//const{getCustomerById,getCustomers,getCustomersBySearch,addCustomer,updateCustomer,deleteCustomer}=require('../services/CustomerPG');
router.get('/', async (req, res) => {
	const records= await getCustomers();
    res.send(records);
});

router.post('/', async (req, res) => {
	let customer = req.body;
	await addCustomer(customer);
	res.send({result:'success', msg:'record added ok.'});
});

router.put('/', async (req, res)=> {
	let customer = req.body;
    await updateCustomer(customer);
	res.send({result:'success', msg:'record updated ok.'});
});

router.delete('/', async (req, res)=> {
	let customer = req.body;
    await deleteCustomer(customer.id);
	res.send({result:'success', msg:'record deleted ok.'});
});

router.get('/:id', async (req, res) =>{
	const id = req.params.id;
    const customer = await getCustomerById(id);
	res.send(customer);
});


router.put('/customer/edit/:id', async (req, res)=> {
	const records=await updateCustomer(req.params.id);
	res.send(records);
});

router.get('/:sortBy/:asdes', async(req, res, next)=> {
	const sortBy = req.params.sortBy;
	  const asdes = req.params.asdes;
	  const records=await sortCustomer(sortBy,asdes);
	  res.send(records);
  });

router.get('/:field/:searchWord', async (req, res)=> {
    const fieldName = req.params.field.toLowerCase();
	const searchWord = req.params.searchWord.toLowerCase();
	const list = await getCustomersBySearch(fieldName,searchWord);
    res.send(list);
    
});


module.exports = router;
