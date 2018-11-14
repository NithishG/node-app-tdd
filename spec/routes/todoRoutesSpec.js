var express = require("express");

var supertest = require("supertest");
var BASE_URL = "http://localhost:3000/api/todo"
var proxyquire = require("proxyquire");


describe("Application Routes", () => {
    describe("Get all Todos Route", () => {

        var TodoControllerStub = {};
        var app, request, todoRoute;
        beforeEach(() => {
            app = express();
            todoRoute = proxyquire("../../app/routes/todo-routes", {
                "../controllers/todo-controller": TodoControllerStub
            });
            
            todoRoute(app);
            request = supertest(app);
        });

        it("Get All Todos should send response 200", (done) => {
            let date = Date.now();
            let expectedTodos = [{
                todo: "Dummy Todo",
                completed: false,
                created_at: date
            }];

            TodoControllerStub.getAllTodos = () => {
                return Promise.resolve(expectedTodos);
            }

            request.get("/api/todo")
                .end(function(err, res) {
                    if (err) {
                        done.fail(err);
                    } else {
                        expect(res.statusCode).toBe(200)
                        expect(res.body).toEqual(expectedTodos);
                        done();
                    }
                  });
        });

        it("Get All Todos should send response 500", (done) => {
            let errorMsg = "Something went wrong";
            
            TodoControllerStub.getAllTodos = () => {
                return Promise.reject(errorMsg);
            }

            request.get("/api/todo")
                .end(function(err, res) {
                    if (err) {
                        done.fail(err);
                    } else {
                        expect(res.statusCode).toBe(500)
                        expect(res.text).toEqual(errorMsg);
                        done();
                    }
                });
        });
    });
});