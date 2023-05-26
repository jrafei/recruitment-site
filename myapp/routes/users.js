var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/userslist', function (req, res, next) {
  result=userModel.readall(function(result){
    res.render('usersList', { title: 'List des utilisateurs', users:result });
  });});

/* GET recruiters listing. */
router.get('/recruiterslist', function (req, res, next) {
   result=userModel.readallrecruiters(function(result){
     res.render('recruitersList', { title: 'List des recruteurs', recruiters:result });
   });});

/* GET candidats listing. */
router.get('/candidatslist', function (req, res, next) {
  result=userModel.readallcandidats(function(result){
    res.render('candidatsList', { title: 'List des candidats', candidats:result });
  });});

/* GET admins listing. */
router.get('/adminslist', function (req, res, next) {
  result=userModel.readalladmins(function(result){
    res.render('adminsList', { title: 'List des administrateurs', admins:result });
  });});
  
module.exports = router;