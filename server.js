var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./app/config/config.json");

var app = express();
var todoRouter = require("./app/routes/todo-routes");

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

mongoose.connect(config.db);

mongoose.connection.on("connected", () => {
    console.log("Mongoose connection establised: " , config.db);
});

app.listen(config.port, (error) => {
    if(error) throw error;
    else console.log("Server started on port: " +config.port);
});

todoRouter(app);

module.exports = app;