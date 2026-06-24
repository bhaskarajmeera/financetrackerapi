import UserSchema from "./UserSchema.js";


/* CRUD operations query */

export const inserUser=(userObj)=>{
    return UserSchema(userObj).save();
}