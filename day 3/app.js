const express = require('express')
const app = express()
const {getCurrentDate,printLog} = require('./FGWUtils')

app.use(express.urlencoded({extended:true}))


app.post('/survey',(req,res)=>{
    var nameInput = req.body.txtName;
    res.setHeader('Content-Type','text/html');
    //res.end('<h1>Thank you ' + nameInput + '</h1>')
    res.write(`<h1>Thank you ${nameInput} for participating the survey! <h1>`)
    var now = getCurrentDate();
    printLog(now)
    res.end(`Current date: ${now}`)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/about',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.end('<h1 style="color:red">About page</h1>')
})

const PORT = 5000;
app.listen(PORT);
console.log('Server is running on Port: ',PORT)