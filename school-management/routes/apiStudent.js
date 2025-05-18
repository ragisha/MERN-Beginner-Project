var express = require('express');
var router = express.Router();

//const{getStudentById,getStudents,getStudentsBySearch,addStudent,updateStudent,deleteStudent}=require('../services/StudentPG');
const{getStudentById,getStudents,addStudent,getCourseById,deleteStudent,updateStudent,getStudentsBySearch}=require('../services/StudentSQL')

//student
router.get('/', async (req, res) => {
	const records=await  getStudents();
    res.send(records);
});

router.post('/', async (req, res) => {
	let student = req.body;
	await addStudent(student);
	res.send({result:'success', msg:'record added ok.'});
});

router.put('/',async  (req, res)=> {
	let student = req.body;
    await updateStudent(student);
	res.send({result:'success', msg:'record updated ok.'});
});

router.delete('/', async (req, res)=> {
	let student = req.body;
    await deleteStudent(student.id);
	res.send({result:'success', msg:'record deleted ok.'});
});

router.get('/:id', async (req, res) =>{
	const id = req.params.id;
    const student =await  getStudentById(id);
	res.send(student);
});


router.put('/student/edit/:id', async (req, res)=> {
	const records=await updateStudent(req.params.id);
	res.send(records);
});

router.get('/student/course/:id', async (req, res)=> {
	const records=await getStudentById(req.params.id);
	res.send(records);
});


router.get('/:field/:searchWord',async  (req, res)=> {
    const fieldName = req.params.field.toLowerCase();
	const searchWord = req.params.searchWord.toLowerCase();
	const list = await getStudentsBySearch(fieldName,searchWord);
    res.send(list);
    
});


module.exports = router;