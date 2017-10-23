const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {toDolistDB} = require('./../models/todo.js');

//Clearing all the TODOs in the database 
beforeEach((done)=>{
    // runs before each test in this block
    toDolistDB.remove({}).then(() => done());
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
				toDolistDB.find().then((todos) =>{
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
					expect(todos.length).toBe(0);
					done();
				}).catch((e) => {
					done(e);
				});
			}
		});		
	});

});