import { check,validationResult } from "express-validator";

class Validator{
static validateInput = (req,res,next) =>{
    const errors = validationResult(req);

if(!errors.isEmpty()){
    const errorMessage = errors.errors.map((err)=>err.msg);
    return res.status(400).json({
        status:400,
        message:errorMessage
    })
}
return next();

}


static newAccountRules(){

    return [
             check("email","please your email is not valid").isEmail(),
             check("firstName","please your firstname have a  special  character").isAlpha(),
             check("lastName","please your lastname have a special character").isAlpha(),
             check("gender","please your gender is not valid").isIn(['Male','Female']),
             check("phone","please your phone number  is not valid").isMobilePhone(),
             check("age","please your age should be integer").isInt(),
             check("nationalId","your nationalId should be in 16 digit").isString(),
             //check("password","please your password must be strong").isStrongPassword()


    ];
}

 static  checkId(){
     return[
              check("id","your id should be mongoId").isMongoId()

     ];
 }


}

export default Validator;