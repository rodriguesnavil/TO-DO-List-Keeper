module.exports ={
  ensureAuthenticated:(req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg','You are not authorized to perform this action');
    res.redirect('/users/login');
  }
}