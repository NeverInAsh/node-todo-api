var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {toDolistDB} = require('./models/todo');
var {userlistDB} = require('./models/users');

var app = express();


//Middleware to post JSON sent from client to object
app.use(bodyParser.json());

app.post('/todos',(req,res) =>{
	//console.log(req.body);
	var todo = new toDolistDB({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.status(200).send(doc);
	},(err)=>{
		res.status(400).send(err); //to be modified
	})

})

app.get('/todos', (req, res) =>{
	toDolistDB.find().then((todos)=>{
		res.status(200).send({
			todos// send back all the todos
		})
	},(err)=>{
		res.status(400).send(err);
	})

})

app.listen(3000,()=>{
	
	console.log("Server up and running successfully on port 3000");
	
});

module.exports = {
	app
}