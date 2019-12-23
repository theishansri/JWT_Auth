const joi=require('@hapi/joi');
//Register Validation
const register_validation=(data)=>{
    const schema={
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    };
    return joi.validate(data,schema);
}
const login_validation=(data)=>{
    const schema={
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    };
    return joi.validate(data,schema);
}
module.exports.register_validation=register_validation;
module.exports.login_validation=login_validation
