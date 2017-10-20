const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp',(err, db) =>{
	if(err){
		console.log("Unable to connect to database");
	}else{
		console.log("Connected to MongoDb Server");
	
	db.collection('todoDB').findOneAndUpdate({
		_id: new ObjectID('59ea0298e422c1fcf6456286')
	},{
		$set:{
			completed:false
		}
	},{
		returnOriginal: false
	}).then((result)=>{
		console.log(result);
	})

	}
	
	//db.close();
})