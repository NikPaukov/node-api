const users = require('../repositories/usersDB');





//Validaation

exports.isObjValid = function(obj, properties){
    if(Object.keys(obj).length != properties.length) return false;
    for (let property of properties) {
        if(!obj.hasOwnProperty(property)) return false
    }
    return true;
}
exports.doesUserExistsByProperty = function(obj,propName){
    if (users.find((el)=> el[propName] === obj[propName]) != undefined) return true;
    return false;
}





exports.create = function(user){
    users.push(user);
}
exports.readById = function(id){
    return users.find((el)=>el["_id"] === id);
}


exports.readAll = function(){
    return users;
}


exports.delete = function(id){
    const userIndex =  users.findIndex((el)=>el["_id"===id])
    users.splice(userIndex, 1);
}

exports.update = function(newUser, id){
    const properties = ["_id", "name", "health", "attack", "defense", "source"];
    const userIndex =  users.findIndex((el)=>el["_id"]===id)
    for(let prop in newUser){
        if(prop === '_id' &&  (dbService.doesUserExistsByProperty(newUser, "_id") ||  typeof newUser[prop] != 'string')) continue
        if(properties.includes(prop)){
        console.log(newUser[prop]);
        users[userIndex][prop] = newUser[prop];
    }
  }
  return users[userIndex];
}
