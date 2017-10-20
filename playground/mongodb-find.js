const {MongoClient,ObjectID} = require('mongodb');//destructuring of objects ES6

MongoClient.connect("mongodb://localhost:27017/toDoApp", (err, db) =>{
	if(err){
		console.log("Unable to connect to database");
	}else{
		console.log("Connected to MongoDB Server");
		//db.collection('todoDB').find();//return a pointer to all the docs
		//db.collection('todoDB').find().toArray(); //returns a promise

		// db.collection('todoDB').find({completed:false}).toArray().then((docs) =>{
		// 	console.log('todoDB');
		// 	console.log(JSON.stringify(docs, undefined, 4));

		// },(err)=>{
		// 	console.log("Unable to fetch todos", err);
		// })
		
		// db.collection('todoDB').find({
		// 	_id: new ObjectID('59ea0284e422c1fcf6456282')
		// }).toArray().then((docs) =>{
		// 	console.log('todoDB');
		// 	console.log(JSON.stringify(docs, undefined, 4));

		// },(err)=>{
		// 	console.log("Unable to fetch todos", err);
		// })

		db.collection('todoDB').find().count().then((count) =>{
			console.log('todoDB total counts:- ');
			console.log(`${count}`);

		},(err)=>{
			console.log("Unable to fetch todos", err);
		})
		
		

	}

	//db.close();
})