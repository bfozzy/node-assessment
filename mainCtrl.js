var app = require("./server.js");
var users = require("./users.json");

module.exports = {

  getUsers: function(req, res){
    var usersByAge = [];
    var usersByLanguage = [];
    var usersByCity = [];
    var usersByState = [];
    var usersByGender = [];

    if (req.query.age){
      for (let i = 0; i < users.length; i++){
        if (users[i].age == req.query.age){
          usersByAge.push(users[i]);
        }
      }
      res.status(200).json(usersByAge);
    }
    else if (req.query.language){
      for (let i = 0; i < users.length; i++){
        if (users[i].language === req.query.language){
          usersByLanguage.push(users[i]);
        }
      }
      res.status(200).json(usersByLanguage);
    }
    else if (req.query.city){
      for (let i = 0; i < users.length; i++){
        if (users[i].city.toLowerCase() === req.query.city.toLowerCase()){
          usersByCity.push(users[i]);
        }
      }
      res.status(200).json(usersByCity);
    }
    else if (req.query.state){
      for (let i = 0; i < users.length; i++){
        if (users[i].state.toLowerCase() === req.query.state){
          usersByState.push(users[i]);
        }
      }
      res.status(200).json(usersByState);
    }
    else if (req.query.gender){
      for (let i = 0; i < users.length; i++){
        if (users[i].gender.toLowerCase() === req.query.gender){
          usersByGender.push(users[i]);
        }
      }
      res.status(200).json(usersByGender);
    }
    else {
      res.status(200).json(users);
    }
  }, // ends getUsers

  getUser: function(req, res){
    var usersByPrivlege = [];
    var userFound = false;
    var userById;

    for (let i = 0; i < users.length; i++){
      if (users[i].type == req.params.id){
          usersByPrivlege.push(users[i]);
      }
      else if (users[i].id == req.params.id){
        userFound = true;
        userById = users[i];
      }
    }

    if (userFound){
      res.status(200).json(userById);
    }
    else if (usersByPrivlege[0]){
      res.status(200).json(usersByPrivlege);
    }
    else {
      res.sendStatus(404);
    }
  }, // end getUser

    createUser: function(req, res){
      var newUser = {
        "id": users.length + 1,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "language": req.body.language,
        "age": req.body.age,
        "city": req.body.city,
        "state": req.body.state,
        "type": req.body.type,
        "favorites": [req.body.favorites]
      };
      users.push(newUser);
      res.status(200).json(newUser);
    },// ends createUser

    createAdminUser: function(req, res){
      var newUser = {
        "id": users.length + 1,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "language": req.body.language,
        "age": req.body.age,
        "city": req.body.city,
        "state": req.body.state,
        "type": req.params.type,
        "favorites": [req.body.favorites]
      };
      users.push(newUser);
      res.status(200).json(newUser);
    },// ends createAdminUser

    changeLanguage: function(req, res){
      let changedUser;
      for (let i = 0; i < users.length; i++){
        if (users[i].id == req.params.id){
          users[i].language = req.body.language;
          changedUser = users[i];
        }
      }
      res.status(200).json(changedUser);
    }, // ends changeLanguage

    addFavorite: function(req, res){
      let changedUser;
      for (let i = 0; i < users.length; i++){
        if (users[i].id == req.params.id){
          users[i].favorites.push(req.body.add);
          changedUser = users[i];
        }
      }
      res.status(200).json(changedUser);
    }, // ends addFavorite

    removeFavorite: function(req, res){
      let changedUser;
      for (let i = 0; i < users.length; i++){
        if (users[i].id == req.params.id){
          let index = users[i].favorites.indexOf(req.query.favorite);
          users[i].favorites.splice(index, 1);
          changedUser = users[i];
        }
      }
      res.status(200).json(changedUser);
    },// ends removeFavorite

    banHammer: function(req, res){
      var userIndex;
      for (let i = 0; i < users.length; i++){
        if (users[i].id == req.params.id){
          userIndex = i;
          users.splice(i, 1);
        }
      }
      res.status(200).json(users);
    },// ends banHammer

    updateUser: function(req, res){
      let updateUser;
      for (let i =0; i < users.length; i++){
        if (users[i].id == req.params.id){
          for (var userProp in users[i]){
            for (var bodyProp in req.body){
              if (userProp === bodyProp){
                users[i][userProp] = req.body[bodyProp];
              }
            }
          }
          updateUser = users[i];
        }
      }
      res.status(200).json(updateUser);
    }// ends updateUser






};
