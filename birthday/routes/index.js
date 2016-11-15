var express = require('express');
var router = express.Router();

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Friend = mongoose.model('Friend');
var Birthday = mongoose.model('Birthday');

var JSONfeed = [];
var JSONForGame = [];
var JSONForAJAX = [];

var january = [];
var february = [];
var march = [];
var april = [];
var may = [];
var june = [];
var july = [];
var august = [];
var september = [];
var october = [];
var november = [];
var december = [];


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var dateYear = new Date().getFullYear();
  if (req.user) {
    User
      .findOne({username: req.user.username})
      .populate('friends').exec(function(err, user) {

        Friend.find({user: req.user._id}, function(err, friends, count) {
          // console.log(friends);

          // loop through all friends of the user
          // search birthday id's for the birthday
          // if birthday in january add to the january array

          JSONfeed = [];
          JSONForGame = [];
          JSONForAJAX = [];

          january = [];
          february = [];
          march = [];
          april = [];
          may = [];
          june = [];
          july = [];
          august = [];
          september = [];
          october = [];
          november = [];
          december = [];

          pushMonth(january, '01');
          pushMonth(february, '02');
          pushMonth(march, '03');
          pushMonth(april, '04');
          pushMonth(may, '05');
          pushMonth(june, '06');
          pushMonth(july, '07');
          pushMonth(august, '08');
          pushMonth(september, '09');
          pushMonth(october, '10');
          pushMonth(november, '11');
          pushMonth(december, '12');


          function pushMonth(monthArray, monthName) {
            // console.log('month: ' +monthName);
            for (i = 0; i < friends.length; i++) {
              birthdayID = friends[i].birthday;
              //console.log(birthdayID);
              Birthday.findOne({_id: birthdayID}, function(err, birthday, counnt) {
                if (birthday.month === monthName) {
                  monthArray.push(birthday);
                  //
                  var personYearBefore = {
                    title: '',
                    start: ''
                  }
                  personYearBefore.title = birthday.friend;
                  personYearBefore.start = (dateYear-1) + '-' + birthday.month + '-' + birthday.day;

                  var person = {
                    title: '',
                    start: ''
                  }
                  person.title = birthday.friend;
                  person.start = dateYear + '-' + birthday.month + '-' + birthday.day;

                  var personYearAfter = {
                    title: '',
                    start: ''
                  }
                  personYearAfter.title = birthday.friend;
                  personYearAfter.start = (dateYear+1) + '-' + birthday.month + '-' + birthday.day;

                  // create 3 for the calendar but one for the game
                  // console.log(person);
                  JSONfeed.push(person);
                  JSONfeed.push(personYearBefore);
                  JSONfeed.push(personYearAfter);

                  JSONForGame.push(person);


                }
              });
            }
          }
        });
    });
  }
  res.render('index', { title: 'Birthday Reminder'});
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}),
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your registration information is not valid'});
    }
    else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      console.log(user.username);
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    }
    else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/add-birthday', function(req, res, next) {
  // console.log(req.headers);
  // if (req.status) {
  //   res.render('add-birthday', { user: req.user }, {message:'Add another friend\'s birthday or go to view all!'});
  // }
  // else {
    res.render('add-birthday', { user: req.user });
  // }
});

router.post('/add-birthday', function(req, res, next) {
  birthday = req.body.birthday;
  birthdayYear = birthday.slice(0,4);
  birthdayMonth = birthday.slice(5,7);
  birthdayDay = birthday.slice(8,10);
  // console.log("birthday year: " + birthdayYear + "birthday month: " + birthdayMonth + "birthday Day: " + birthdayDay);

  new Birthday({
    friend: req.body.firstName.capitalizeFirstLetter() + " " + req.body.lastName.capitalizeFirstLetter(),
    month: birthdayMonth,
    day: birthdayDay,
    year: birthdayYear,
  }).save(function(err, birthday, count) {
    // do stuff when the date save is done
    new Friend({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      user: req.user._id,
      name: req.body.friend,
      birthday: birthday,
      // new Birthday({}).save(function(err, birthday, count))
    }).save(function(err, friend, count) {
      // do stuff when the save is done
      req.user.friends.push(friend);
      req.user.save(function(err, savedUser, count) {
        // console.log(req.user);
        res.redirect(302, 'add-birthday');
      });
    });

  });
});

//
// router.get('/view-all'), function(req, res, next) {
//   res.render('view-all', {january: january, february: february, march: march, april: april, may: may, june: june, july: july, august: august, september: september, october: october, november: november, december: december});
// }

router.get('/view-all', function(req, res, next) {
  User
    .findOne({username: req.user.username})
    .populate('friends').exec(function(err, user) {

      Friend.find({user: req.user._id}, function(err, friends, count) {
        // console.log(friends);


        // loop through all friends of the user
        // search birthday id's for the birthday
        // if birthday in january add to the january array
        var january2 = [];
        var february2 = [];
        var march2 = [];
        var april2 = [];
        var may2 = [];
        var june2 = [];
        var july2 = [];
        var august2 = [];
        var september2 = [];
        var october2 = [];
        var november2 = [];
        var december2 = [];
        pushMonth(january2, '01');
        pushMonth(february2, '02');
        pushMonth(march2, '03');
        pushMonth(april2, '04');
        pushMonth(may2, '05');
        pushMonth(june2, '06');
        pushMonth(july2, '07');
        pushMonth(august2, '08');
        pushMonth(september2, '09');
        pushMonth(october2, '10');
        pushMonth(november2, '11');
        pushMonth(december2, '12');

        function pushMonth(monthArray, monthName) {
          // console.log('month: ' +monthName);
          for (i = 0; i < friends.length; i++) {
            birthdayID = friends[i].birthday;
            //console.log(birthdayID);
            Birthday.findOne({_id: birthdayID}, function(err, birthday, count) {
              if (birthday.month === monthName) {
                // console.log(birthday);
                monthArray.push(birthday);
                // create birthday object and push it onto the month
                // var birthdayObject = {
                //   friend: birthday.friend,
                //   day: birthday.day
                // }
                // monthArray.push(birthdayObject);

                // console.log('length of '+monthName + '  :'+ monthArray.length);
                monthArray.sort(compareFunction);
              }
            });

          }
        }


        // function sort month array before rendering
        // september.sort(compareFunction);

        function compareFunction(a ,b) {
          // console.log(a.day);
          // console.log(b.day);
          return a.day-b.day;
        }

        //  {name: list.name, items: list.items, user: req.user}
        res.render('view-all', {january: january2, february: february2, march: march2, april: april2, may: may2, june: june2, july: july2, august: august2, september: september2, october: october2, november: november2, december: december2});
      });


  });
});

router.get('/api/view-all', function(req, res) {

  function compareFunction(a ,b) {
    // console.log(a.day);
    // console.log(b.day);
    return a.day-b.day;
  }

  if(req.query.month) {

    switch(req.query.month) {
        case '01':
            january.sort(compareFunction);
            res.send(january);
            break;
        case '02':
            february.sort(compareFunction);
            res.send(february);
            break;
        case '03':
            march.sort(compareFunction);
            res.send(march);
            break;
        case '04':
            april.sort(compareFunction);
            res.send(april);
            break;
        case '05':
            may.sort(compareFunction);
            res.send(may);
            break;
        case '06':
            june.sort(compareFunction);
            res.send(june);
            break;
        case '07':
            july.sort(compareFunction);
            res.send(july);
            break;
        case '08':
            august.sort(compareFunction);
            res.send(august);
            break;
        case '09':
            september.sort(compareFunction);
            res.send(september);
            break;
        case '10':
            october.sort(compareFunction);
            res.send(october);
            break;
        case '11':
            november.sort(compareFunction);
            res.send(november);
            break;
        case '12':
            december.sort(compareFunction);
            res.send(december);
            break;
        default:
            res.send();
            break;


    }
  }
  else {
    res.send();
  }

  // Birthday.find(birthdayFilter, function(err, birthdays, count) {
  // //res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  //   res.send(birthdays);
  // });

  for (var i = 0; i < JSONForGame.length; i++) {
    if(JSONForGame[i].month = req.query.month) {
      JSONForAJAX.push(JSONForGame[i]);
    }
  }
  console.log("adksfjw;");
  console.log(JSONForAJAX);
  res.send(JSONForAJAX);

});

router.get('/game-by-name', function(req, res, next) {
  res.render('game-by-name');
});
router.get('/game-by-birthday', function(req, res, next) {
  res.render('game-by-birthday');
});
router.get('/JSONfeed', function(req, res, next) {
  res.send(JSONfeed);
});
router.get('/JSONForGame', function(req, res, next) {
  res.send(JSONForGame);
});
router.get('/JSONForAJAX', function(req, res, next) {
  res.send(JSONForAJAX);
});


module.exports = router;
