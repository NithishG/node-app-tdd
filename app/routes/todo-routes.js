var TodoController = require("../controllers/todo-controller");

module.exports = function(app) {
  var router = require("express").Router();
  router.get("", (request, response, next) => {
    //console.log(request.originalUrl);
    return TodoController.getAllTodos()
      .then(result => {
        //console.log("router get result",result);
        response.send(result);
      })
      .catch(error => {
        response.status(500).send("Something went wrong");
      });
  });

  app.use("/api/todo", router);
};
