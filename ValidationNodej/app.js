const express = require('express')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.post('/check',(req,res)=>{
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    var err = {}
    var isError = false;
    if(name == null || name.length <5){
        err.name = "Do dai ten >=5 ky tu!"
        isError = true;
    }
    if(price == null || price.trim().length ==0 || isNaN(price)){
        err.price = "Gia phai la so!"
        isError = true;
    }
    if(isError){
        res.render('index',{error: err})
    }else{
        var msg = []
        var slice = name.slice(2,5);
        var indexOf = name.indexOf("@");
        msg.push("Slice (2,5) " + slice)
        msg.push("IndexOf @ " + indexOf)
        res.render('noError',{messages:msg})
    }

})

app.get('/',(req,res)=>{
    res.render('index')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log('Server is running' + PORT)