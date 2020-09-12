const questionSchema=require('../models/Question');

//render the add question form 
module.exports.renderForm=function(req,res){
    return res.render("addQuestionform",{
        title: "Add Question"
    })
}

//create the question and add it in the database
module.exports.create=async function(req,res){

    try{
        console.log(req.body);
        //query for creating question
        let question=await questionSchema.create({
            query: req.body.query,
            topic:req.body.topic,
            //use array for fill all the tag
            tags: [req.body.tag[0],req.body.tag[1],req.body.tag[2]]
        })
        req.flash('success',"Question added successfully");
        return res.redirect('/');
    }catch(err){
        //if error occurs
        console.log(err);
        req.flash('error',err.message);
        return res.redirect("back");
    }
    
}

//get all question from databse it will return json data i make it as a api and fetch that api using js and show data to user
module.exports.getQuestions=async function(req,res){

    try{
        //query for find all questions
        let questions=await questionSchema.find().sort('createdAt');
        console.log(questions);

        return res.json(200,{
            message: "List of questions",
            //return question in json format
            questions : questions
            
        })

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}


//search all questions as per search term from databse user search questions using enter tags and it will return data in json format
module.exports.getSearchQuestions=async function(req,res){
    try{
        //query for search questions
        let questions = await questionSchema.find({tags:req.params.searchTerm});

        return res.json(200,{
            message: "List of questions",
            questions : questions
            
        })
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}