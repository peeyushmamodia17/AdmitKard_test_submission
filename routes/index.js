//import express
const express=require('express');
//set the router
const router = express.Router();
//import the homecontroller file from controller folder
const homeController=require('../controllers/homeController');

//when paathb or url is "/" then it goes to home function in homecontroller
router.get('/',homeController.home);
//when url is "/question" or "/api" them it goes to question_router or api file folder. 
router.use("/question",require("./question_router"));
router.use('/api',require('./api'));

module.exports=router;