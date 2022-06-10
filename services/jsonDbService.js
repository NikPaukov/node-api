const { json } = require('express');
const fs = require('fs');
const { use } = require('../app');
const as = require('../repositories/usersDB.json')
const filePath = 'repositories/usersDB.json';


//Validaation

exports.isObjValid = function(obj, properties){
    if(Object.keys(obj).length != properties.length) return false;
    for (let property of properties) {
        if(!obj.hasOwnProperty(property)) return false
    }
    return true;
}
exports.doesUserExistsByProperty = function(obj,propName){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (users.find((el)=> el[propName] === obj[propName]) != undefined) return true;
    return false;
}





exports.create = function(user){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users));
}
exports.readAll = function(){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return users;

}

exports.readById = function(id){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return users.find((el)=>el["_id"] === id);
}



exports.delete = function(id){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const userIndex =  users.findIndex((el)=>el["_id"]===id)
    users.splice(userIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(users));

}

exports.update = function(newUser, id){
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const userIndex =  users.findIndex((el)=>el["_id"]===id)
    let user = users[userIndex];
    for(let prop in user){
        if(prop!="_id"){
            user[prop] = newUser[prop];
        }
    }
  fs.writeFileSync(filePath, JSON.stringify(users));
  return users[userIndex];
}

