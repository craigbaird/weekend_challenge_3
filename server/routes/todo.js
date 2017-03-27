var express = require('express');
var router = express.Router();
var pg = require('pg');


var config = {
  database: 'craigbaird', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  // SELECT * FROM "todo";
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('SELECT * FROM todo ORDER BY "id" ASC;', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          // console.log(result); // Good for debugging
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/add', function(req, res){
  console.log(req.body);
  // var id = req.body.id;
  var task = req.body.task;
  // INSERT INTO "todo" ("author", "title") VALUES ('David Mitchel','Cloud Atlas');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO "todo" ("task")' +
               ' VALUES ($1);',
               [task], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  // SELECT * FROM "books";
  var delTask = req.params.id;
  console.log(req.params.id);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('DELETE FROM "todo" WHERE "id" = $1;',
      [delTask],
      function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          console.log(result); // Good for debugging
          res.send(200);
        }
      });
    }
  });
});

router.put('/edit', function(req, res){
  // var updateBook = req.params.id;
  console.log(req.body);
  var task = req.body.task;
  var id = req.body.id;
  // INSERT INTO "books" ("author", "title") VALUES ('David Mitchel','Cloud Atlas');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('UPDATE "todo"  SET "task" = $2 WHERE "id" = $1; ',
        [id, task],
        function(queryError, result){
        done();

        if(queryError) {
          console.log('Error making update.');
          res.send(500);
        } else {
          res.sendStatus(200);
        } // end else
      }); // end query error
    } // end else
   }); // end pool.connect
}); // end router function

module.exports = router;
