import schedulerInfo from "../models/Scheduler";


class SchedulerUserController{
    static createScheduler = async(req,res)=>{
        console.log(req.body);
        req.body.Employee=req.user.id;
        //req.body.sector=req.sector.id;
        const session = await schedulerInfo.create(req.body);
        if(!session){
            return res.status(400).json({
                status:400,
                message:"failed to register a scheduler"
            })
        
        }
        return res.status(200).json({
            status:200,
            message:"success",
            data:session
        })
    }
    
    static getAllScheduler = async(req,res)=>{
        let sectors;
        if(req.user.role=="user" || req.user.role=="admin")
        sectors = await schedulerInfo.find();
        else if(req.user.role=="Employee")
    sectors= await schedulerInfo.find({Employee:req.user.id});
        if (!sectors) {
            return res.status(404).json({
                status:404,
                message:"failed to get all sector!"
            })
            
        }
    
        return res.status(200).json({
            status:200,
            message:"success!",
            data:sectors
        })
    }
    static getOne = async(req,res)=>{
        const session = await schedulerInfo.findById(req.params.id);
        if(!session){
            return res.status(400).json({
                status:400,
                message:"failed to get that user"
            })
        
        }
        return res.status(200).json({
            status:200,
            message:"success to get the session",
            data:session
        })
    }
    static updateScheduler = async(req,res)=>{
        const update = await schedulerInfo.findByIdAndUpdate(req.params.id,req.body);
        if(!update){
            return res.status(400).json({
                status:400,
                message:"failed to update"
            })
        
        }
        const updated = await schedulerInfo.findById(req.params.id);
        return res.status(200).json({
            status:200,
            message:"successfully updated",
            data:updated
        })
    }
    static deleteScheduler = async(req,res)=>{
        const session = await schedulerInfo.findByIdAndDelete(req.params.id);
        if(!session){
            return res.status(400).json({
                status:400,
                message:"failed to delete"
            })
        
        }
       //// const deleted = await SessionInfo.find();
        return res.status(200).json({
            status:200,
            message:"Success to delete this session.",
            data:session
            //data:deleted
        })
    }
   
    
    static acceptOnescheduler = async(req,res)=>{  
    
        const session = await schedulerInfo.findByIdAndUpdate(req.params.id, {status:"BOOKED"});
    
        if (!session) {
            return res.status(404).json({
                status:404,
                message:"failed to update  session!"
            })
            
        }
    const update = await schedulerInfo.findById(req.params.id);
        return res.status(200).json({
            status:200,
            message:"woow!succesfully updated!",
            data:update
    
        })
    }
    static getAllUserScheduler = async (req, res)=> {
        const id = req.params.id;
        console.log(req.user);
        const users = await schedulerInfo.find({Employee:req.user.id});
        if (!users){
            return res.status(404).json({
                status: 404,
                message: "failed to get all Schedulers"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data:users
        })
    }
    


}

export default SchedulerUserController;