// Importing express module
const { urlencoded } = require('express');
const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'node_testing',
	user:'root',
	password:''
});
let database_connection_status = '';

connection.connect(function(error){
	if(error){
		database_connection_status = `<h3 class="text-danger text-center">Database Connection Failed</h3>`;
	}
	else{
		database_connection_status = `<h3 class="text-success text-center">Database Connection Success</h3>`;
	}
});
app.use(express.urlencoded());
// Getting Request
app.get('/', (req, res,next) => {

	// Sending the response
	res.send(`
	<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body class="container">
		${database_connection_status}
		<form method="POST" action="/submit">
		<div class="form-group">
			<label for="first_name">First Name</label>
			<input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter firstname">
		</div>
		<div class="form-group">
			<label for="last_name">Last Name</label>
			<input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter lastname">
		</div>
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
		</form>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
	`)
	
	// Ending the response
	res.end()
})
app.get('/home',(req,res) =>{
  res.send('Welcome to home page')
});
app.post('/submit',(req,res,next) => {
	res.send(req.body);
	res.send('req.body');
	console.log(req.body);
})
// Establishing the port
const PORT = process.env.PORT ||2000;

// Executing the server on given port number
app.listen(PORT, console.log(
`Server started on port ${PORT}`));
console.log();
