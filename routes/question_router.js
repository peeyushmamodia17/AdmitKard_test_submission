//import express
const express=require('express');

//set the router
const router = express.Router();

//import questioncontroller from controller folder
const questionController=require('../controllers/question_controller');

//router for rendering the add question form 
router.get('/renderForm',questionController.renderForm);
//router for create the question
router.post('/create',questionController.create);

module.exports=router;