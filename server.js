const { urlencoded } = require('express')
const express = require('express')
const app = express()

const mongodb = require('mongodb')
let db

let port = process.env.PORT
if(port == null || port == ""){
    port = 3000
}

let connectionString = "mongodb+srv://anggaDB:Anggoro06@cluster0.u938m.mongodb.net/Savings?retryWrites=true&w=majority"
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    db = client.db()
    app.listen(port)
})

app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

app.get('/', function(req, res){
    db.collection('items').find().toArray((err, items) => {
        res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Savings</title>
    </head>
    <body style="background-color: #18191A; font-family: Arial, Helvetica, sans-serif;">
        <h1 style="font-size: 35px; padding-top: 21px; color: #E4E6EB; text-align: center;" >Save Joe Money!</h1>
        <div style="background-color: #242526; margin-top: 250px; margin-left: 577px; width: 35%; height: 231px; border-radius: 18px; line-height: 45px; color: #E4E6EB; padding: auto" >
            <p style="color: #E4E6EB; padding-top: 17px; font-size: 17px; margin-left: 31px; margin-bottom: -28px" >You have saved</p>
            ${items.map((item) => {
                return `
                <h1 data-id="${item._id}" class="saved" style="color: #E4E6EB; font-size: 46px; margin-left: 31px; margin-bottom: -3px" >Rp ${item.value}</h1>
                <button class="add-me" type="Button" style="background-color: #0E6B0E; width: 160px; height: 38px; border-radius: 18px; margin-top: 45px;  margin-left: 31px; border: 0px; color: #E4E6EB;"> + </button>
                <button class="sub-me" type="Button" style="background-color: #8E1600; width: 160px; height: 38px; border-radius: 18px; margin-top: 45px;  margin-left: 31px; border: 0px; color: #E4E6EB;""> - </button>`
            }).join("")}
            
        </div>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="/browser.js"></script>
    </body>
    </html>
    `)
    })
})

app.post('/add', function(req, res){
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectID("5feef9c67f16d587b63887ac")}, { $inc: { value : req.body.value } }, (err, info) => {
        console.log("OK")
        console.log(req.body.value) 
    })
})

app.post('/sub', function(req, res){
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectID("5feef9c67f16d587b63887ac")}, {$inc: {value : -req.body.value}}, () => {
        console.log("OK")
        console.log(req.body.value)
        res.redirect('/')
    })
})

