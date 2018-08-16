"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.use(express.static(`${__dirname}/../public`));
server.listen(port, (err) => {
    if (err)
        return console.log(err);
    console.log(`Server is up and running on port ${port}`);
});
