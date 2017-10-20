//mongoclient:- connects to a database server and do database oepratiosn

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/toDoApp', (err, db) => {
	// first argument is the address to our mongodb database server
	//like AWS, heroku or localhost, TodoApp is our database name.
	if(err){
		console.log("Unable to connect to MongoDB server.")
	}else{
		console.log('Connected  to MongoDB server')
	}

	//Adding data into toDos collection
	db.collection('todoDB').insertOne({
		text:'Something to do',
		completed: false
	}, (err, result) => {
		if(err){
			console.log("Unable to insert to database", err);
		}else{
			console.log(JSON.stringify(result.ops, undefined, 4));//result.ops are all the 
			//documents that were written into the collection.
		}
	});

	db.collection('Users').insertOne({
		name:'Anshik Bansal',
		age: 22,
		location: 'India'
	}, (err, result) => {
		if(err){
			console.log("Unable to insert to database", err);
		}else{
			console.log(JSON.stringify(result.ops, undefined, 4));//result.ops are all the 
			//documents that were written into the collection.
		}
	});

	db.close();
	
})