const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbService = require('../services/mongoDbService');

router.get('/users',async function(req, res, next) { 
try{
  const allFigthers = await dbService.readAll();
  console.log(allFigthers);
  res.json(allFigthers);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
});




router.get('/users/:id', async function(req, res, next){
  try{
  const id = req.params.id;
  const user = await dbService.readById(id);
  if(user == undefined) return res.sendStatus(204);
  res.json(user);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})


router.post('/users', async function(req, res, next){
  try{
    const user = req.body;  
    const properties = ["_id", "name", "health", "attack", "defense", "source"];
  
    //validation
    if(!dbService.isObjValid(user, properties)){
      return res.sendStatus(400);
    }
    
    if(await dbService.doesUserExistsById(user._id)){
      return res.status(409).json({message:'User with such id already exists'});
    }
  
    //adding
    await dbService.create(user)
    res.sendStatus(201);
  } catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
  })


router.delete('/users/:id', async function(req, res, next){
  try{

  const id = req.params.id;
  await dbService.delete(id);
  res.sendStatus(200);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})

router.put('/users/:id',async function(req, res, next){
  try{
  const id = req.params.id;
  const newUser = req.body;
  const properties = ["name", "health", "attack", "defense", "source"];

  if(!dbService.isPutValid(newUser, properties)){
    return res.sendStatus(400);
  }

  const updated = await dbService.update(newUser, id);
  res.json(updated);
} catch(e){
  console.log(e);
  return res.sendStatus(500);
}
})
module.exports = router;
