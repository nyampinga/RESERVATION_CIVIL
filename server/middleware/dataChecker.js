import userInfo from "../models/NormalUser";

class DataChecker{
static ValidateEmailDuplicate = async(req,res,next) =>{
    const email = await userInfo.findOne({email: req.body.email});

if(!email){
    return next();
}
return res.status(404).json({
    status:404,
    message:"email address already exist!"
})
}

static CheckAge = (req, res, next) =>{
    if (req.body.age < 21) {
        return res.status(404).json({
            status: 404,
            message: "You are under age. no Access"
        })
    }
    return next();
}

}
export default DataChecker;