//make a setFlash functions for set the flash message and call it from index.js file
module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }

    next();
}