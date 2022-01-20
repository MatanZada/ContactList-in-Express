const express = require('express')
const app = express()
const port = 3000
const fs = require('fs-extra');

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.post('/contact-us', (req, res) => {
    // console.log(req.body.name, req.body.email, req.body.phone);
    let allContactListUsers = fs.readJsonSync('./public/allUsers.json')
    allContactListUsers.push({
        ...req.body
    })
    fs.writeJsonSync('./public/allUsers.json', allContactListUsers)
    res.json({
        ...req.body
    })
    const {
        name,
        email,
        phone
    } = req.body
})

const dataUsers = require('./public/allUsers.json')
const dataReminders = require('./public/reminders.json')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ContactsListUsers";
const client = new MongoClient(url);
const dbName = 'ContactsListUsers';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("UsersContacts").insertMany(dataUsers, function (err, db) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.close();
    });
    dbo.collection("reminderContacts").insertMany(dataReminders, function (err, db) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.close();
    });

});


app.post('/reminders', (req, res) => {
    let remindeMe = fs.readJsonSync('./public/reminders.json')
    remindeMe.push({
        ...req.body
    })
    fs.writeJsonSync('./public/reminders.json', remindeMe)
    res.json({
        ...req.body
    })
    const {
        inputsReminders
    } = req.body

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})