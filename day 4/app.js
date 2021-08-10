const EXPRESS = require('express')
const {ObjectId,MongoClient, Int32} = require('mongodb')

const APP = EXPRESS()
const url = 'mongodb://localhost:27017';

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine','hbs')

APP.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const newStudent = {name:nameInput,tuoi: Int32(tuoiInput)};
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    const newS = await dbo.collection("students").insertOne(newStudent);
    console.log("Gia tri id moi duoc insert la: ",newS.insertedId.toHexString());
    //chuyen huong den file Index
    res.redirect('/');
})
APP.get('/delete',async (req,res)=>{
    const idInput = req.query.id;
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    await dbo.collection("students").deleteOne({_id:ObjectId(idInput)})
    res.redirect('/');
})
APP.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    const allStudents = await dbo.collection("students").find({name:searchInput}).toArray();
    res.render('index',{data:allStudents})
})

APP.get('/',async (req,res)=>{
    const client= await MongoClient.connect(url);
    const dbo = client.db("GCH0803DB");
    const allStudents = await dbo.collection("students").find({}).toArray();
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);