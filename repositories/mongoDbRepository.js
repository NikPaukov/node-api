import { Fighter } from '../dbConnection.js';
export async function findAll(){
        const result = await Fighter.find();
        
        return result;
  
}


export function  findById (id){
    const fighter =  Fighter.findById(id);
    return fighter;
}
export function save(input){
    const fighter = new Fighter(input);
    return  fighter.save();
    
}
export function deleteOne(idObj){
    return Fighter.deleteOne(idObj);
}
export function update(idObj, newUser){
   return Fighter.updateOne(idObj, newUser);
    }
