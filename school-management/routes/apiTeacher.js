var express = require('express');
var router = express.Router();

const{getTeacherById,getTeachers,addTeacher,deleteTeacher,updateTeacher,getTeachersBySearch}=require('../services/TeacherSQL')

//teacher
router.get('/', async (req, res) => {
	const records=await  getTeachers();
    res.send(records);
});

router.post('/', async (req, res) => {
	let teacher = req.body;
	await addTeacher(teacher);
	res.send({result:'success', msg:'record added ok.'});
});

router.put('/',async  (req, res)=> {
	let teacher = req.body;
    await updateTeacher(teacher);
	res.send({result:'success', msg:'record updated ok.'});
});

router.delete('/', async (req, res)=> {
	let teacher = req.body;
    await deleteTeacher(teacher.id);
	res.send({result:'success', msg:'record deleted ok.'});
});

router.get('/:id', async (req, res) =>{
	const id = req.params.id;
    const teacher =await  getTeacherById(id);
	res.send(teacher);
});


router.put('/teacher/edit/:id', async (req, res)=> {
	const records=await updateTeacher(req.params.id);
	res.send(records);
});


router.get('/:field/:searchWord',async  (req, res)=> {
    const fieldName = req.params.field.toLowerCase();
	const searchWord = req.params.searchWord.toLowerCase();
	const list = await getTeachersBySearch(fieldName,searchWord);
    res.send(list);
    
});


module.exports = router;