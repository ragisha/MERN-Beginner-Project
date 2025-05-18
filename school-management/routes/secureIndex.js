var express = require('express');
var router = express.Router();

//const{getStudentById,getStudents,getStudentsBySearch,addStudent,updateStudent,deleteStudent}=require('../services/StudentPG');
const{getStudentById,getStudents,addStudent,deleteStudent,updateStudent,getCourseById,getStudentsBySearch}=require('../services/StudentSQL');
const{getTeacherById,getTeachers,addTeacher,deleteTeacher,updateTeacher,getTeachersBySearch}=require('../services/TeacherSQL');
const{getSubjectById,getSubjects,addSubject,deleteSubject,updateSubject,getSubjectsBySearch,checkID, doCheck}=require('../services/SubjectSQL');

router.get('/dashboard',  (req, res, next) => {
  res.render('index', { title: 'Dashboard'});
});


router.get('/student', async (req, res, next) => {
  res.render('student', { title: 'Student',data:await getStudents()});
});

router.get('/student/add',  (req, res, next) => {
  res.render('add-student', { title: 'Add Student'});
});

router.get('/student/edit/:id',async (req, res, next)=> {
  const student=await getStudentById(req.params.id);
  res.render('edit-student', { title: 'Edit Student',student});
});

router.get('/student/course/:id',async (req, res, next)=> {
  const student=await getCourseById(req.params.id);
  res.render('student', { title: 'Display Student',student});
});

router.get('/student/search/:field/:searchWord',async (req, res, next)=> {
  const fieldName = req.params.field;
  const searchWord = req.params.searchWord;
  res.render('student', { title: 'Student',data:await getStudentsBySearch(fieldName,searchWord)});
});

//teacher

router.get('/teacher', async (req, res, next) => {
  res.render('teacher', { title: 'Teacher Page',data:await getTeachers()});
});

router.get('/teacher/add',  (req, res, next) => {
  res.render('add-teacher', { title: 'Add teacher'});
});

router.get('/teacher/edit/:id',async (req, res, next)=> {
  const teacher=await getTeacherById(req.params.id);
  res.render('edit-teacher', { title: 'Edit teacher',teacher});
});

router.get('/teacher/search/:field/:searchWord',async (req, res, next)=> {
  const fieldName = req.params.field;
  const searchWord = req.params.searchWord;
  res.render('teacher', { title: 'teacher',data:await getTeachersBySearch(fieldName,searchWord)});
});

//subject

router.get('/subject', async (req, res, next) => {
  res.render('subject', { title: 'subject Page',data:await getSubjects()});
});

router.get('/subject/add',  (req, res, next) => {
  res.render('add-subject', { title: 'Add subject'});
});

router.get('/subject/staff',  (req, res, next) => {
  res.render('subject', { title: 'Add Student Subject'});
});

router.get('/subject/inter',  (req, res, next) => {
  res.render('subject', { title: 'Add subject'});
});

router.get('/subject/edit/:id',async (req, res, next)=> {
  const subject=await getSubjectById(req.params.id);
  res.render('edit-subject', { title: 'Edit subject',subject});
});

router.get('/subject/search/:field/:searchWord',async (req, res, next)=> {
  const fieldName = req.params.field;
  const searchWord = req.params.searchWord;
  res.render('subject', { title: 'subject',data:await getSubjectsBySearch(fieldName,searchWord)});
});

router.get('/subject/check/:pid/:subid',async (req, res, next)=> {
  const pid = req.params.pid;
  const subid = req.params.subid;
  res.render('subject', { title: 'subject',data:await doCheck(pid,subid)});
});

module.exports = router;
