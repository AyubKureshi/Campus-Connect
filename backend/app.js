const express = require('express');
const wrapAsync = require('../backend/utils/wrapasync.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res,) => {
    res.send("<h1>Hello App</h1>");
});
// here user will get to see all details
app.get('/users',(req,res)=>{
    res.send("user data will be visible here");
})
// taking user details from frontend and adding to backend
app.post("/users",(req,res)=>{
    res.send("This is user route");
})
//like here we are taking form from frontend and edit it here just updating it to backend
app.patch("/users/:id",(req,res)=>{
    res.send("This is for edit pusrpose");
})
// we will add onclic event and get id from it and delete from backend
app.delete("/users/:id",(req,res)=>{
    res.send("this is for deleting")
})


module.exports = app;
