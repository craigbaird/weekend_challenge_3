var express = require('express');
var router = express.Router();
var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/todotest'; // different way to connect to database

var config = {
  database: 'craigbaird',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
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
          res.send(result.rows);
        }
      });
    }
  });
});

router.put('/completed', function(req, res){
  console.log(req.body);
  var id = req.body.id;
  var compTask = req.body.compTask;

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('UPDATE "todo" SET "completed" = $1 WHERE "id" = $2;',
        [compTask, id],
        function(queryError, result){
        done();

        if(queryError) {
          console.log('Error making update.', queryError);
          res.send(500);
        } else {
          res.sendStatus(200);
        } // end else
      }); // end query error
    } // end else
   }); // end pool.connect
}); // end router function

router.post('/add', function(req, res){
  console.log(req.body);
  var task = req.body.task;
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
          // console.log(result); // Good for debugging
          res.send(200);
        }
      });
    }
  });
});

router.put('/edit', function(req, res){
  console.log(req.body);
  var task = req.body.task;
  var id = req.body.id;
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
