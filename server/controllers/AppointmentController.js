import appointmentInfo from "../models/Appointments";
import userInfo from "../models/NormalUser";


class AppointmentController {
    static createAppointment = async (req, res) => {
        console.log(req.body);
      // req.body.Employee = req.user.id;
       req.body.user = req.user.id;
        const appointment = await appointmentInfo.create(req.body);
        if (!appointment) {
            return res.status(400).json({
                status: 400,
                message: "failed to register a scheduler"
            })

        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data: appointment
        })
    }

    static getAllAppointment = async (req, res) => {
        const id = req.params.id;
        var sessions;
        if(req.user.role=="Employee"){

            sessions= await appointmentInfo.find({Employee:id});

        }else if(req.user.role==="user"){

            sessions= await appointmentInfo.find({user:id});
        } 
        else if(req.user.role==="admin"){

            sessions= await appointmentInfo.find();
        } 

        if (!sessions) {
          
            return res.status(404).json({
                status: 404,
                message: "failed to get all sessions"
            })


        }

        return res.status(200).json({
            status: 200,
            message: "success",
            data: sessions
        })
    }

    static getOne = async (req, res) => {
        const appointment = await appointmentInfo.findById(req.params.id);
        if (!appointment) {
            return res.status(400).json({
                status: 400,
                message: "failed to get that user"
            })

        }
        return res.status(200).json({
            status: 200,
            message: "success to get the session",
            data: appointment
        })
    }
    static updateAppointment = async (req, res) => {
        const update = await appointmentInfo.findByIdAndUpdate(req.params.id, req.body);
        if (!update) {
            return res.status(400).json({
                status: 400,
                message: "failed to update"
            })

        }
        const updated = await schedulerInfo.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "successfully updated",
            data: updated
        })
    }
    static deleteAppointment = async (req, res) => {
        const appointment = await appointmentInfo.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(400).json({
                status: 400,
                message: "failed to delete"
            })

        }
        //// const deleted = await SessionInfo.find();
        return res.status(200).json({
            status: 200,
            message: "Success to delete this session.",
            data: appointment
            //data:deleted
        })
    }

    static declineOneAppointment = async (req, res) => {

        const session = await appointmentInfo.findByIdAndUpdate(req.params.id, { status: "decline" });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "failed to update  session!"
            })

        }
        const update = await appointmentInfo.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "woow!succesfully updated!",
            data: update

        })
    }

    static acceptOneAppointment = async (req, res) => {

        const session = await appointmentInfo.findByIdAndUpdate(req.params.id, { status: "approve" });

        if (!session) {
            return res.status(404).json({
                status: 404,
                message: "failed to update  session!"
            })

        }
        const update = await appointmentInfo.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "woow!succesfully updated!",
            data: update

        })
    }


}

export default AppointmentController;