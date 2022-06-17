import * as repositoriy from '../repositories/mongoDbRepository.js'

export  function isObjValid(obj, properties){
    if(Object.keys(obj).length != properties.length) return false;
    for (let property of properties) {
        if(!obj.hasOwnProperty(property)) return false
    }
    return true;
}
export function isPutValid(obj, properties){
    if(obj.hasOwnProperty("_id")) return false;
    if(Object.keys(obj).length >= properties.length) return false;
    for (let prop in obj) {
        if(!properties.includes(prop)) return false
    }
    return true;
}

export  function doesUserExistsById(id){

    return repositoriy.findById(id);

}


export function create(figther){
    return repositoriy.save(figther);
    
}
export function readAll(){
    
    const all =   repositoriy.findAll();
    return all;
}


export function deleteOne(id){
   return repositoriy.deleteOne({"_id":id});
}

export function update(newUser, id){
    return repositoriy.delete({"_id":id}, newUser);

}


export function readById(id){
    return repositoriy.findById(id);
}