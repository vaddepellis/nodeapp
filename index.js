// Importing express module
const express = require('express');
const moment = require('moment');
const app = express();
require('./db/db');
const Users = require('./models/Users');
const Admin = require('./models/Admin')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
const ejs = require("ejs");
app.set('view engine','ejs');

app.get('/',function(req,res){
	res.redirect('login');
})
app.get('/login',function(req,res){

	res.render('login');
})
app.post('/login',async function(req,res){
	let data = {
		username:req.body.username,
		password:req.body.password
	}
	console.log(data);
	let result = await Admin.findOne(data);
	if(result !== null){
		res.redirect('dashboard');
	}
	else{	
		res.redirect('login');
	}
	

})
app.get('/dashboard',function(req,res){
	res.render('dashboard');
})
app.get('/register',function(req,res){
	res.render('register');
})
app.post('/register',async function(req,res){
	var IST = moment().format('Y-M-D h:mm:ss')
	let data = {
		username:req.body.username,
		email:req.body.email,
		password:req.body.password,
		created:IST
	}
	let user = new Users(data);
	let result = await user.save();
	
	console.log(result);
	
	// res.status(200).send('registered');
})
app.get('/logout',function(req,res){
	res.redirect('login');
})
app.listen('4000',()=>{
	console.log('server started');
})
