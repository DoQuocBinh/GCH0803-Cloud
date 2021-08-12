const EXPRESS = require('express')
const { Int32} = require('mongodb');

const { insertStudent,deleteStudent,searchStudent,getAllStudent,getStudentById,updateStudent} = require('./databaseHandler');

const APP = EXPRESS()

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine','hbs')

APP.post('/update',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    await updateStudent(id,nameInput,tuoiInput);
    res.redirect('/');
})

APP.get('/edit',async (req,res)=>{
    const idInput = req.query.id;
    const search_Student = await getStudentById(idInput);
    res.render('edit',{student:search_Student})
})

APP.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const newStudent = {name:nameInput,tuoi: Int32(tuoiInput)};
    await insertStudent(newStudent);
    //chuyen huong den file Index
    res.redirect('/');
})
APP.get('/delete',async (req,res)=>{
    const idInput = req.query.id;
    await deleteStudent(idInput);
    res.redirect('/');
})
APP.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const allStudents = await searchStudent(searchInput);
    res.render('index',{data:allStudents})
})

APP.get('/',async (req,res)=>{
    const allStudents = await getAllStudent();
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);