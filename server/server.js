"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bp = require("body-parser");
const http = require("http");
const home_1 = require("./routes/home");
const login_1 = require("./routes/login");
const app = express();
exports.app = app;
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', home_1.default);
app.use('/login', login_1.default);
server.listen(port, (err) => {
    if (err)
        return console.log(err);
    console.log(`Server is up and running on port ${port}`);
});
