//load the env variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

//set up the database 
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});

const db = mongoose.connection

db.on('error',(error) => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

//set up the layouts 
const expressLayouts = require('express-ejs-layouts');
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//accept body and form data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//hook up the index router 
app.use('/',indexRouter);
//hook up the authors router 
app.use('/authors',authorsRouter);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log('Server started on Port:', PORT);
});
