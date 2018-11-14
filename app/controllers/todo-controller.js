var Todo = require("../models/Todo");

function getAllTodos() {
    return Todo.find((error, results) => {
        if(error) return Promise.reject(error);
        else return Promise.resolve(results);
    });
}

function saveTodo(data) {
    if(!data || !data.todo) return Promise.reject({status: "failure", error: "Missing todo information"});
    let newTodo = new Todo(data);
    //console.log(newTodo)
    return newTodo.save((error, todo) => {
        if(error) return Promise.reject({status: "failure", error:"Something went wrong"});
        else return Promise.resolve({status: "success", todo:todo});
    });
}

function updateTodo(id) {
    return Todo.findById(id, (error, result) => {
        if(error) return Promise.reject({status: "failure", error:"Status not updated"});
        else return Promise.resolve({status: "success", message: "Status updated successfully"});
    })
}

function deleteTodo(id) {
    return Todo.findByIdAndDelete(id, (error, result) => {
        if(error) return Promise.reject({status: "failure", error:"Error deleting a Todo"});
        else return Promise.resolve({status: "success", message: "Todo Deleted successfully"});
    })
}

module.exports = {getAllTodos, saveTodo, updateTodo, deleteTodo, Todo}