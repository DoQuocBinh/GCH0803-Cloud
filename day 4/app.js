const EXPRESS = require('express')
const { Int32} = require('mongodb');

const { insertStudent,deleteStudent,searchStudent,getAllStudent} = require('./databaseHandler');

const APP = EXPRESS()

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine','hbs')

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