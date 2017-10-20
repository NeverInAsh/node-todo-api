const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp',(err, db) =>{
	if(err){
		console.log("Unable to connect to database");
	}else{
		console.log("Connected to MongoDb Server");
		// //deleteMany
		// db.collection('todoDB').deleteMany({text: 'Play Squash'}).then((result)=>{
		// 	console.log(result);// we can see properties ok =1 and n =3(# of entries)
		// });
		// //deleteOne
		// db.collection('todoDB').deleteOne({text: 'Play Squash'}).then((result)=>{
		// 	console.log(result);
		// });
		//findOneAndDelete
		db.collection('todoDB').findOneAndDelete({completed:false}).then((result)=>{
			console.log(result);
		});
	}

	//db.close();
})