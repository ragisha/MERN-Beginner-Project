var express = require('express');
var router = express.Router();
//const {getProducts, updateProduct, addProduct, deleteProduct,getProductById,searchProduct,sortProduct} = require('../services/ProductService');
//const {getProductById,getProducts,addProduct,deleteProduct,updateProduct,getProductsBySearch} = require('../services/ProductMySQL');
const {getProductById,getProducts,addProduct,deleteProduct,updateProduct,getProductsBySearch} = require('../services/ProductMySQL');

router.get('/', async (req, res) => {
	const records= await getProducts();
    res.send(records);
});

router.post('/', async (req, res) => {
	let product = req.body;
	await addProduct(product);
	res.send({result:'success', msg:'record added ok.'});
});

router.put('/', async (req, res) => {
	let product = req.body;
    const records= await updateProduct(product);
	res.send(records);
});

router.delete('/', async (req, res) => {
	let product = req.body;
    await deleteProduct(product.id);
	res.send({result:'success', msg:'record deleted ok.'});
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
    const product = await getProductById(id);
	res.send(product);
});

router.put('/product/edit/:id',async (req, res) => {
	const records= await updateProduct(req.params.id);
	res.send(records);
});

router.get('/:field/:searchWord',async (req, res) => {
    const fieldName = req.params.field.toLowerCase();
	const searchWord = req.params.searchWord.toLowerCase();
	const list = await getProductsBySearch(fieldName,searchWord);
    res.send(list);
    //res.send(list);
});

router.get('/product/sort/:sortBy/:asdes', async(req, res, next)=> {
	const sortBy = req.params.sortBy;
	  const asdes = req.params.asdes;
	  const records= await sortProduct(sortBy,asdes);
	  res.render(records);
  });

module.exports = router;
