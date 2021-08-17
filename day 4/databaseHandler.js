const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "GCH0803DB"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertUser(user) {
    const dbo = await getDB();
    const newS = await dbo.collection("users").insertOne(user);
    console.log("Gia tri id moi duoc insert la: ", newS.insertedId.toHexString());
}

async function insertStudent(newStudent) {
    const dbo = await getDB();
    const newS = await dbo.collection("students").insertOne(newStudent);
    console.log("Gia tri id moi duoc insert la: ", newS.insertedId.toHexString());
}

async function deleteStudent(idInput) {
    const dbo = await getDB();
    await dbo.collection("students").deleteOne({ _id: ObjectId(idInput) });
}
async function searchStudent(searchInput) {
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({ name: searchInput }).toArray();
    return allStudents;
}
async function getAllStudent() {
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({}).toArray();
    return allStudents;
}

async function getStudentById(idInput){
    const dbo = await getDB();
    return dbo.collection("students").findOne({_id:ObjectId(idInput)});
}

async function updateStudent(id,nameInput,tuoiInput){
    const dbo = await getDB();
    dbo.collection("students").updateOne({_id:ObjectId(id)},{$set:{name:nameInput,tuoi:tuoiInput}})

}
async function checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection("users").findOne({name:nameI,pass:passI});
    if (user==null) {
        return "-1"
    }else{
        console.log(user)
        return user.role;
    }
}

module.exports = {getDB,insertStudent,deleteStudent,searchStudent,getAllStudent,getStudentById,updateStudent,insertUser,checkUserRole}