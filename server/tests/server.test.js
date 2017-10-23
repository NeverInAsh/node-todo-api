const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {toDolistDB} = require('./../models/todo.js');

const todos = [{
	_id:new ObjectID(),
	text: 'First customary todo'
},{
	_id:new ObjectID(),
	text: 'Second customary todo'
}]

//Clearing all the TODOs in the database 
beforeEach((done)=>{
    // runs before each test in this block
    toDolistDB.remove({}).then(() => {
    	return toDolistDB.insertMany(todos);
    }).then(() => done());
  });

describe('POST/todos', ()=>{
	it('should create a new todo', (done) =>{
		var text = 'Test to do test';
		request(app)
		.post('/todos')
		.send({text}) //ES6 syntax, gets converted to JSON by supertest
		.expect(200)
		.expect((res) =>{ //expect is passed the response
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err){
				done(err); // status not 200 and text not matching
			}else{
				//Assumptions on Database
				toDolistDB.find({text}).then((todos) =>{
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) =>{//to catch any error
					done(e);	
				});
			}
		});
	});

	it('should not create a todo with invalid data', (done) => {
		request(app)
		.post('/todos')
		.send({}) //ES6 syntax, gets converted to JSON by supertest
		.expect(400)
		.end((err, res) =>{
			if(err){
				done(err);
			}else{
				toDolistDB.find().then((todos) =>{
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => {
					done(e);
				});
			}
		});		
	});

});

describe('GET/todos', () =>{
	it('should get all the todos', (done) =>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) =>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);//Since we r not doing anything asynchronously
	});
});

describe('GET /todos/:id', () =>{
	it('should return todo doc', (done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo_id.text).toBe(todos[0].text);
		})
		.end(done);

	it('shoudl return 404 if todo not found', (done) =>{
		var newID = new ObjectID();
		request(app)
		.get(`/todos/${newID.toHexString()}`)
		.expect(404)
		.end(done)

	});

	it('shoudl return 404 for non object id', (done) =>{
		var newID = '1234';
		request(app)
		.get(`/todos/${newID}`)
		.expect(404)
		.end(done)

	});

	});

});