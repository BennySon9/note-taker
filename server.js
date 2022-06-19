const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");

// set up server
const app = express();
var PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET route requests
app.get();

// post request
app.post("");

// delete request
app.delete();

// html calls
// calls home
app.get();

// call notes.html
app.get();

//start listening
app.listen();
