"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Router = express.Router();
Router.get('/', (req, res, next) => {
    res.send("<h1>Hello this is the Login Route</h1>");
});
exports.default = Router;
