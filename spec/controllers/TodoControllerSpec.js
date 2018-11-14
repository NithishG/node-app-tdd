var proxyquire = require("proxyquire");

var todoModelStub = {};//require("../../app/models/Todo");
var TodoController = proxyquire("../../app/controllers/todo-controller", {
    "../models/Todo": todoModelStub
});

describe("Todo Controller",() => {
    describe("Get All Todos", () => {
        it("Get all the todos return an empty array", (done) => {
            let expectedTodos = [];
    
            todoModelStub.find = (cb) => {
                return cb(null,expectedTodos);
            }
            TodoController.getAllTodos()
                .then((todos) => {
                    //console.log(todos);
                    expect(todos.length).toBe(expectedTodos.length);
                    done();
                })
        });

        it("Get all the todos return an array with one todo", (done) => {
            let date = Date.now();
            let expectedTodos = [{
                todo: "Dummy Todo",
                completed: false,
                created_at: date
            }];
    
            todoModelStub.find = (cb) => {
                return cb(null, expectedTodos);
            }
    
            TodoController.getAllTodos()
                .then((todos) => {
                    //console.log(todos);
                    expect(todos.length).toBe(expectedTodos.length);
                    expect(Object.keys(todos)).toEqual(jasmine.arrayContaining(Object.keys(expectedTodos)));
                    expect(todos).toEqual(expectedTodos);
                    done();
                })
        });

        it("Get all the todos return an error", (done) => {
            let expectedResult = "Dummy Error";
    
            todoModelStub.find = (cb) => {
                return cb(expectedResult, null);
            }
    
            TodoController.getAllTodos()
                .catch((error) => {
                    //console.log(error);
                    expect(error).toBe(expectedResult);
                    done();
                })
        });
    });

    describe("Save New Todo", () => {

        let stubconstructor = function() {
        }
        var TodoControllerNew = proxyquire("../../app/controllers/todo-controller", {
            "../models/Todo": stubconstructor
        });

        it("Saving a new Todo should return status success", (done) => {
            let date = Date.now();
            let updateTodo = {
                todo: "Dummy Todo",
                completed: false,
                created_at: date
            };
            let expectedResult = {status: "success", todo: updateTodo};   
            stubconstructor.prototype.save = (cb) => {
                return cb(null, updateTodo);
            }     

            TodoControllerNew.saveTodo(updateTodo)
                .then((result) => {
                    //console.log("result",result);
                    expect(result.status).toBe(expectedResult.status);
                    expect(result.todo).toEqual(expectedResult.todo);
                    done();
                })
        });

        it("Saving a new Todo should return status failure", (done) => {
            let date = Date.now();
            let updateTodo = {
                todo: "Dummy Todo",
                completed: false,
                created_at: date
            };
            
            let expectedResult = {status: "failure", error:"Something went wrong"};
            stubconstructor.prototype.save = (cb) => {
                return cb("Dummy error", null);
            }     

            TodoControllerNew.saveTodo(updateTodo)
                .catch((error) => {
                    //console.log("error: ",error);
                    expect(error.status).toBe(expectedResult.status);
                    expect(error.error).toEqual(expectedResult.error);
                    done();
                })
        });

        it("Saving a new Todo should return status failure with missing information error", (done) => {
                        
            let expectedResult = {status: "failure", error:"Missing todo information"};
            
            TodoControllerNew.saveTodo({})
                .catch((error) => {
                    //console.log("error: ",error);
                    expect(error.status).toBe(expectedResult.status);
                    expect(error.error).toEqual(expectedResult.error);
                    done();
                })
        });
    });

    describe("Update a Todo", () => {
        it("Updating a todo should return status success", (done) => {
            let date = Date.now();
            let expectedResult = {status: "success", message: "Status updated successfully"};

            todoModelStub.findById = (id, cb) => {
                return cb(null, expectedResult);
            }

            TodoController.updateTodo("1234")
            .then((result) => {
                expect(result.status).toEqual(expectedResult.status);
                expect(result).toEqual(expectedResult);
                done()
            })
        });

        it("Updating a todo should return status error", (done) => {
            let date = Date.now();
            let expectedResult = {status: "failure", error: "Status not updated"};

            todoModelStub.findById = (id, cb) => {
                return cb(expectedResult, null);
            }

            TodoController.updateTodo("1234")
            .catch((error) => {
                expect(error.status).toEqual(expectedResult.status);
                expect(error).toEqual(expectedResult);
                done()
            })
        });
    })

    describe("Delete a Todo", () => {
        it("Deleting a todo should return status success", (done) => {
            let expectedResult = {status: "success", message: "Todo Deleted successfully"};
            
            todoModelStub.findByIdAndDelete = (id, cb) => {
                return cb(null, expectedResult);
            }

            TodoController.deleteTodo("1234")
            .then((result) => {
                expect(result.status).toEqual(expectedResult.status);
                expect(result).toEqual(expectedResult);
                done()
            })
        });

        it("Deleting a todo should return status error", (done) => {
            let expectedResult = {status: "failure", error: "Error deleting a Todo"};

            todoModelStub.findByIdAndDelete = (id, cb) => {
                return cb(expectedResult, null);
            }

            TodoController.deleteTodo("1234")
            .catch((error) => {
                expect(error.status).toEqual(expectedResult.status);
                expect(error).toEqual(expectedResult);
                done()
            })
        });
    })
});