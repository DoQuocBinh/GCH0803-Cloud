const EXPRESS = require('express')
const { Int32} = require('mongodb');
const session = require('express-session')

const { insertStudent,deleteStudent,searchStudent,getAllStudent,getStudentById,updateStudent} = require('./databaseHandler');

const APP = EXPRESS()

// Use the session middleware
APP.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }}))

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
APP.get('/login',(req,res)=>{
    res.render('login')
})
APP.post('/doLogin',(req,res)=>{
    const nameInput = req.body.txtName;
    const passInput = req.body.txtPassword;
    if(nameInput=="tom" && passInput =="123"){
        req.session["User"]={
            name : nameInput,
            role : 'admin'
        }
    }
    res.redirect('/');
})

APP.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const pictureInput = req.body.picture;
    const newStudent = {name:nameInput,tuoi: Int32(tuoiInput),picture:pictureInput};
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
    if(!req.session["User"])
        res.redirect('/login')
    const allStudents = await getAllStudent();
    res.render('index',{data:allStudents,user:req.session["User"]})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);