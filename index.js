//import express
const express=require('express');
//import cookie-parser for handle cookie
const cookieParser=require('cookie-parser');
// use path for given the path to folder
const path=require('path');
const app=express();
//server listen on port 8000
const port=8000;
//use the ejs layouts for rendering the pages 
const expressLayouts=require('express-ejs-layouts');
//import the mongoose for database
const db=require('./config/mongoose');
//use express session for for flash message and for session
const session=require('express-session');
//use sass for css 
const sassMiddleware=require('node-sass-middleware');
//use for flash message to show notifications
const flash=require('connect-flash');
//use middleware for set flash
const middleware=require('./config/middleware');

//set the sass for convering sass file into css and acces them
app.use(sassMiddleware({
    src : './assets/scss',
    dest :'./assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
//middleware for data
app.use(express.urlencoded());

app.use(cookieParser());
//set static assets folder for css and js files
app.use(express.static('assets'));
//set layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set ejs view engine for user interface for rendering and writing html code
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//set session for stability of flash message
app.use(session({
    name:'codieal',
    //todo change the secret before deployment
    secret:'peeyush',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
}));

//set flash 
app.use(flash());
app.use(middleware.setFlash);

//set routes for accessing paths of url
app.use('/',require('./routes'));

//app will be run on 8000 port
app.listen(port,function(err){
    if(err){
        console.log("error in running the server on port");
    }

    console.log("Server successfully running on port",port);
})
