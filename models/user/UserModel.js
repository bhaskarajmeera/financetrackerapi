import UserSchema from "./UserSchema.js";


/* CRUD operations query */

export const inserUser=(userObj)=>{
    return UserSchema(userObj).save();
}

/*  request data by email */

export const getUserByEmail = email => {
    return UserSchema.findOne({ email});
}