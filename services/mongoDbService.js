const repositoriy = require('../repositories/mongoDbRepository');


exports.isObjValid = function(obj, properties){
    if(Object.keys(obj).length != properties.length) return false;
    for (let property of properties) {
        if(!obj.hasOwnProperty(property)) return false
    }
    return true;
}
exports.isPutValid = function(obj, properties){
    if(obj.hasOwnProperty("_id")) return false;
    if(Object.keys(obj).length >= properties.length) return false;
    for (let prop in obj) {
        if(!properties.includes(prop)) return false
    }
    return true;
}

exports.doesUserExistsById = function(id){

    return repositoriy.findById(id);

}


exports.create = function(figther){
    return repositoriy.save(figther);
    
}
exports.readAll = function(){
    
    const all =   repositoriy.findAll();
    return all;
}


exports.delete = function(id){
   return repositoriy.delete({"_id":id});
}

exports.update = function(newUser, id){
    return repositoriy.update({"_id":id}, newUser);

}


exports.readById = function(id){
    return repositoriy.findById(id);
}