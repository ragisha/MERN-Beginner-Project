var express = require('express');
var router = express.Router();
// var customerService = require('../service/customer-service');
// var customerDbService = require('../service/customerdb-service');
// var customerMongoService = require('../service/customer-mongo-service');

//const {getCustomers,searchCustomer, sortCustomer, updateCustomer, getCustomerById, customerCount} = require('../services/CustomerService');
const {getProductById,getProducts,addProduct,deleteProduct,updateProduct,getProductsBySearch } = require('../services/ProductMySQL');

//const {getCustomerById,getCustomers,addCustomer,deleteCustomer,updateCustomer,getCustomersBySearch} = require('../services/CustomerMySQL');
const{getCustomerById,getCustomers,getCustomersBySearch,addCustomer,updateCustomer,deleteCustomer}=require('../services/CustomerPG');

/* GET home page. */

router.get('/dashboard', (req, res, next)=> {
  res.render('index', { title: 'Dashboard',customerCount: getCustomers().length, productCount: getProducts().length }); //page
});

router.get('/about', async (req, res, next)=> {
  res.render('index', { title: 'About', customerCount:await getCustomers().length, productCount: await getProducts().length });
});

router.get('/customer', async (req, res, next) => {
  res.render('customers', { title: 'Customers',data: await getCustomers()});
});

router.get('/product', async (req, res, next) => {
  res.render('products', { title: 'Products',data:await getProducts()});
});

router.get('/customer/add', async (req, res, next) => {
  res.render('add-customer', { title: 'Add Customer'});
});

router.get('/product/add', async (req, res, next) => {
  res.render('add-product', { title: 'Add product'});
});

router.get('/customer/edit/:id', async(req, res, next)=> {
  const customer=await getCustomerById(req.params.id);
  res.render('edit-customer', { title: 'Edit Customer',customer});
});

router.get('/product/edit/:id', async (req, res, next) => {
  const product=await getProductById(req.params.id);
  res.render('edit-product', { title: 'Edit product',product});
});

router.get('/customer/search/:field/:searchWord', async(req, res, next)=> {
  const fieldName = req.params.field;
  const searchWord = req.params.searchWord;
  res.render('customers', { title: 'Customers',data:await getCustomersBySearch(fieldName,searchWord)});
});

router.get('/product/search/:field/:searchWord', async (req, res, next) => {
  const fieldName = req.params.field;
  const searchWord = req.params.searchWord;
  res.render('products', { title: 'Products',data:await getProductsBySearch(fieldName,searchWord)});
});

router.get('/customer/sort/:sortBy/:asdes', async(req, res, next)=> {
  const sortBy = req.params.sortBy;
	const asdes = req.params.asdes;
	res.render('customers', { title: 'Customer Sort:',data:await sortCustomer(sortBy,asdes)});
});

router.get('/product/sort/:sortBy/:asdes', async (req, res, next) => {
  const sortBy = req.params.sortBy;
	const asdes = req.params.asdes;
	res.render('products', { title: 'Product Sort:',data:await sortProduct(sortBy,asdes)});
});
module.exports = router;