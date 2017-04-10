var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

service.getUserList = getUserList;
service.getUserById = getUserById;
service.updateUserList= updateUserList


module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    console.log("update service");
    var deferred = Q.defer();
    userParam = userParam.user;

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }
    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getUserList(req,res){
    var deferred = Q.defer();
    // db.collection('users').find().toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     deferred.resolve(_.omit(result, 'hash'));
    // });
    // return deferred.promise;
    console.log(req);
    var currentpage=1;
    var pagecount=5;
    if(req.page){
        currentPage=req.page;
    }

    currentpage = currentpage*pagecount;

    db.users.find().skip(currentpage).limit(pagecount).toArray(function(err,response){
        if(err) deferred.reject(err.name +" : " + err.message);

        
        // if(response){
        //     var data = {
        //     response:response,
        //     pagecount:pagecount,
        //     currentpage:currentpage
        // };

        
        if(response){
            var info = [];
            info.push({
                data: response, 
                currentpage:  currentpage,
                pagecount:pagecount
            });

             var result = [];
             result.info =  info;
            deferred.resolve(_.omit(result, 'hash'));
        } else {
            // return result not found
            deferred.resolve();
        }
    });

     return deferred.promise;
}

function getUserById(req){
    var deferred = Q.defer();
    console.log(req.id);
    //  db.users.findById(req.id, function (err, response) {
    //     if (err) deferred.reject(err.name + ': ' + err.message);

    //     if (response) {
    //         // return user (without hashed password)
    //         deferred.resolve(_.omit(response, 'hash'));
    //         return json(response);
    //     } else {
    //         // user not found
    //         deferred.resolve();

    //     }
    // });
    
    db.users.findById(req.id, function(err,response){
        if(err) deferred.reject(err.name +" : " + err.message);
        if(response){
           // return result lists 
            deferred.resolve(_.omit(response, 'hash'));
        } else {
            // return result not found
            deferred.resolve();
        }
    });

    //deferred.resolve(_.omit(req, 'hash'));
    return deferred.promise;


}

function updateUserList(params){
    var deferred = Q.defer();
    
    var param = params.user_data;
    //console.log(param.firstName);

    // fields to update
        var set = {
            firstName: param.firstName,
            lastName: param.lastName,
            username: param.username,
        };

        // update password if it was entered
        if (param.password) {
            set.hash = bcrypt.hashSync(param.password, 10);
        }

        console.log(set);

        var parameter = {_id: mongo.helper.toObjectID(param._id)};
        var data = {'$set': set};

         // db.collection('users').update(parameter, data , function(err, result) {
         //    // if (err) deferred.reject(err.name + ': ' + err.message);
         //    //     deferred.resolve();

         //    if (err) throw err;
         //    if (result) console.log('Updated!');
         // });


         db.users.update({ _id: mongo.helper.toObjectID(param._id)},{ '$set': set },function (err, result) {
             
                if(err) deferred.reject(err.name +" : " + err.message);
                if(result){
                   // return result lists 
                    deferred.resolve(_.omit(result, 'hash'));
                } else {
                    // return result not found
                    deferred.resolve();
                }

             });
    
    return deferred.promise;

}