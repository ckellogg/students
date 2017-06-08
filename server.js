console.log('loading server');

const WEB = __dirname.replace('server', 'web');

//load main modules
var express = require('express');
var fs = require('fs');

//load express middleware modules
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var path = require('path');

//create express app
var app = express();

//insert middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(favicon(WEB + '/img/favicon.png'));
app.use(bodyParser.urlencoded({
   extended: true
})); //TODO delete if not needed

// REST API calls go here
// Create
app.post('/api/v1/students', function(req, res) {
   // var id = "0001"; //TODO
   fs.readdir(__dirname + '/students', function(err, files) {
      if (err) throw err;

      var lastFile = files.sort().pop(); //ex 0006.json
      lastFile = /\d*/.exec(lastFile);

      var id = ('0000' + (+lastFile + 1)).slice(-4);

      var data = JSON.stringify(req.body, null, 3);
      fs.writeFile(`${__dirname}/students/${id}.json`, data, 'utf8', function(err, files) {
         if (err) throw err;
         res.status(201).json(id);

      }); //end of fs.writeFile
   }); //End of fs.readdir
}); //End of app.post
//Read
app.get('/api/v1/students/:id.json', function(req, res) {
   var id = req.params.id;
   fs.readFile(`${__dirname}/students/${id}.json`, function(err, data) {
      if (err) throw err;

      var fileContent = JSON.parse(data);
      res.status(200).json(fileContent);
   });
});
//Update
app.put('/api/v1/students/:id.json', function(req, res) {
   var id = req.params.id;
   var data = JSON.stringify(req.body, null, 3);
   fs.writeFile(`${__dirname}/students/${id}.json`, data, 'utf8', function(err) {
      if (err) throw err;
      res.sendStatus(204);
   });
});
//Delete
app.delete('/api/v1/students/:id.json', function(req, res) {
   var id = req.params.id;
   fs.unlink(`${__dirname}/students/${id}.json`, function(err) {
      if (err) throw err; //TODO handle 404

      res.sendStatus(204);
   });
});
//List
app.get('/api/v1/students.json', function(req, res) {
   fs.readdir(`${__dirname}/students`, function(err, files) {
      if (err) throw err;

      // var fileList = filesWithJson.map(fileName => fileName.replace('.json', ''));
      res.status(200).json(files);
   });
});

//traditional webserver stuff for serving static files
app.use(express.static(WEB)); /// this makes node serve the webpages

app.get('*', function(req, res) {
   res.status(404).sendFile(WEB + '/404.html');
});

var server = app.listen(process.env.PORT, process.env.IP);

function gracefullShutdown() {
   console.log('\nStarting Shutdown');
   server.close(function() {
      console.log('\nShutdown Complete');
   });
}

process.on('SIGTERM', function() { //kill (terminate)
   gracefullShutdown();
});

process.on('SIGINT', function() { //Ctrl+C (interrupt)
   gracefullShutdown();
});

//SIGKILL (kill -9) can't be caught by any process, including node
//SIGSTP/SIGCONT (stop/continue) can't be caught by node