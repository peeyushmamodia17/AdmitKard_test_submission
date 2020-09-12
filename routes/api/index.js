const express=require('express');
//set router
const router = express.Router();

//when url is /v1 then it reuire v1 folder
router.use('/v1',require('./v1'));


module.exports=router;