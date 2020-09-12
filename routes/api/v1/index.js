const express=require('express');
//set the router
const router = express.Router();
//import the controller for accessing the functions
const questionController=require('../../../controllers/question_controller');

//when url is /questions so it will call getQuestion function and return all questions 
router.get('/questions',questionController.getQuestions);
//router for search questions from all question by spicified search term 
router.get('/questions/search/:searchTerm',questionController.getSearchQuestions);


module.exports=router;