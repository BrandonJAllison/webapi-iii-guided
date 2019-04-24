const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
//configure global middleware

function greeter(teamName) {
  return function(req, res, next){
    req.team = teamName;

    next()
  }
}

//function fourofour(){
 // return function(req,res,next){
//let today = new Date().getSeconds();


  //if (today % 3 === 0){
   // return res.status(404).end();
  //}else {
    //next();
 // }
//}
//}

server.use(express.json());//built in middleware
server.use(helmet());
server.use(morgan('dev'));


server.use(greeter('Web 18'));
//server.use(fourofour());

//configure route andlers/endpoints/request handlers
server.use('/api/hubs', restricted, only('gimli'), hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the ${req.team}</p>
    `);
});

function errorHandler (error, req, res, next){
  res.status(400).send('Bad Panda')
}


function only(name){
  return function(req,res,next){
    if (name === req.headers.name){
      next();
    }
  else {
    res.status(403).send('you shall not pass');
  }
}
};


function restricted(req, res, next){
  const password = req.headers.password;

  if (password === 'mellon'){
    next()
  }else{
    res.status(401).send('you shall not pass')
  }
}



module.exports = server;


