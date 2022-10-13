const express = require('express');
const app = express();
const port= 4000;
const enquireRouter = require('./src/enquiry/route');
const {db} = require('./src/config/db');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require('./src/config/cors'));

app.use ('/enquiry', (req, res, next) => {
    req.db = db;
    next();
}, enquireRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
