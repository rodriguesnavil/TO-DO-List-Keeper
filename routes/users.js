const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const {ensureAuthenticated} = require('../helpers/auth')
//load user model
require('../models/users');
const User = mongoose.model('users');

//render login page
router.get('/login',(req,res)=>{
  res.render('users/login');
})

//render register page
router.get('/register',(req,res)=>{
  res.render('users/register');
})

//LOGIN form post

router.post('/login',(req,res,next)=>{
  passport.authenticate('local', { 
  successRedirect: '/ideas',
  failureRedirect: '/users/login',
  failureFlash: true

})(req,res,next); 
});

//LOGOUT from get 
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','You have successfully Logged out!');
  res.redirect('/users/login');
})

//get register post request
router.post('/register',(req,res)=>{
  let errors = [];
    if(!req.body.name){
      errors.push({text:"Name field cannot be left blank"})
    }
    if(!req.body.email){
      errors.push({text:"email field cannot be left blank"})
    }
    if(req.body.password.length < 4){
      errors.push({text:"password must be of at least 4 characters"})
    }
    if(req.body.password != req.body.password2){
      errors.push({text:"passwords do not match!"})
    }
    if(errors.length > 0){
      res.render('users/register',{
        errors: errors,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
    }else{
      //here we check if user with same email exist
      User.findOne({email:req.body.email})
      .then(user=>{
        if(user){
          req.flash('error_msg','Same user with email already exist');
          res.redirect("/users/register")
        }else{
            const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if (err) throw err;
              newUser.password = hash;
              // console.log(newUser);
              newUser.save()
              .then(user =>{
                req.flash('success_msg','You have registered successfully!')
                res.redirect('/users/login')
              })
              .catch(err=>{
                console.log(err);
                return;
              });
            });
          })
        }
      })
    }
})




module.exports = router;
