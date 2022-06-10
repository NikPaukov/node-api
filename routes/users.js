const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbService = require('../services/jsonDbService');

router.get('/users', function(req, res, next) { 
try{
  res.send(dbService.readAll());
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
});




router.get('/users/:id', function(req, res, next){
  try{
  const id = req.params.id;
  const user = dbService.readById(id);
  if(user == undefined) return res.sendStatus(204);
  res.send(user);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})


router.post('/users', function(req, res, next){
  try{
    const user = req.body;  
    const properties = ["_id", "name", "health", "attack", "defense", "source"];
  
    //validation
    if(!dbService.isObjValid(user, properties)){
      return res.sendStatus(400);
    }
    if(dbService.doesUserExistsByProperty(user, "_id")){
      return res.status(409).send('User with such id already exists');
    }
  
    //adding
    dbService.create(user);
    res.sendStatus(201);
  } catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
  })


router.delete('/users/:id', function(req, res, next){
  try{

  const id = req.params.id;
  dbService.delete(id);
  res.sendStatus(200);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})

router.put('/users/:id', function(req, res, next){
  try{
  const id = req.params.id;
  const newUser = req.body;
  const properties = ["name", "health", "attack", "defense", "source"];

  if(!dbService.isObjValid(newUser, properties)){
    return res.sendStatus(400);
  }

  const updated = dbService.update(newUser, id);
  res.send(updated);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})
module.exports = router;
