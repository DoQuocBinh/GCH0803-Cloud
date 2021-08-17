const express = require('express')
const app = express()
const { getCurrentDate, printLog } = require('./FGWUtils')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')


app.post('/survey', (req, res) => {
    var nameInput = req.body.txtName;
    var jobInput = req.body.job;
    res.render('survey', { name: nameInput, job: jobInput, now: getCurrentDate() })

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/about', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1 style="color:red">About page</h1>')
})

const PORT = 5000;
app.listen(PORT);
console.log('Server is running on Port: ', PORT)