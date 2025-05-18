var express = require('express');
var router = express.Router();

const{getSubjectById,getSubjects,addSubject,deleteSubject,updateSubject,getSubjectsBySearch,addInter,addStaff}=require('../services/SubjectSQL');

//subject
router.get('/', async (req, res) => {
	const records=await  getSubjects();
    res.send(records);
});

router.post('/', async (req, res) => {
	let subject = req.body;
	await addSubject(subject);
	res.send({result:'success', msg:'record added ok.'});
});

router.post('/inter', async (req, res) => {
	let subject = req.body;
	await addInter(subject);
	res.send({result:'success', msg:'record added ok.'});
});

router.post('/staff', async (req, res) => {
	let subject = req.body;
	await addStaff(subject);
	res.send({result:'success', msg:'record added ok.'});
});

router.put('/',async  (req, res)=> {
	let subject = req.body;
    await updateSubject(subject);
	res.send({result:'success', msg:'record updated ok.'});
});

router.delete('/', async (req, res)=> {
	let subject = req.body;
    await deleteSubject(subject.id);
	res.send({result:'success', msg:'record deleted ok.'});
});

router.get('/:id', async (req, res) =>{
	const id = req.params.id;
    const subject =await  getSubjectById(id);
	res.send(subject);
});


router.get('/:field/:searchWord',async  (req, res)=> {
    const fieldName = req.params.field.toLowerCase();
	const searchWord = req.params.searchWord.toLowerCase();
	const list = await getSubjectsBySearch(fieldName,searchWord);
    res.send(list);
    
});


module.exports = router;