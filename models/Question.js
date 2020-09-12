const mongoose=require('mongoose');
//here we create question schema
const questionSchema=new mongoose.Schema({
    //add query in databse field
    query:{
        type:String, 
        required:true
    },
    //add topic in databse field
    topic:{
        type:String,
        //enum is use for validation  no any values are taken other then these values
        enum: ["qualifying-criteria","top-colleges","top-ranking","best-result"],
        required:true
    },
    //add tags in databse field
    tags:[
        {
            type:String,
            //enum is use for validation  no any values are taken other then these values
            enum:["stanford-university","usa","admission","engineering","top"],
            required:true
        }

    ]
},
    {
        timestamps: true
    }
);


const question=mongoose.model('question',questionSchema);


module.exports=question;