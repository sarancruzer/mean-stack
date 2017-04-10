var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/getUserList', getUserList);
router.post('/getUserById', getUserById);
router.post('/updateUser', updateUser);


module.exports = router;


function getUserList(req, res) {
    console.log(req.body);    
    userService.getUserList(req.body)
        .then(function (response) {
            if (response) {
                //console.log(response);
                res.send(response);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUserById(req, res) {
  //  console.log(req.body);

     userService.getUserById(req.body)
        .then(function (response) {
            if (response) {
               // console.log(response);
                res.send(response);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });


}

function updateUser(req,res){
//console.log(req.body);

    userService.updateUserList(req.body)
        .then(function(response){

            if (response) {
                //console.log(response);
                res.send(response);
            } else {
                res.sendStatus(404);
            }

    }).catch(function(err){
        res.status(404).send(err)
    });

}



