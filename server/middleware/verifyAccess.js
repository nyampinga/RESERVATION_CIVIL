import verifyToken from "./verifyToken";


const verifyAccess = function(requiredRole){
    return async(req,res,next)=>{
        try {
            const role = req.user.role;
            if (requiredRole!==role) {
                return res.status(403).json({
                    status:403,
                    message:"you are not authorized"
                })
            }

            return next();
        } catch (err) {
            console.log(err);
            
        }
    }

}

export default verifyAccess;