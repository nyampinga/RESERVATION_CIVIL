import express  from "express";

import AppointmentController from "../controllers/AppointmentController";
import Validator from "../middleware/userValidation";
import DataChecker from "../middleware/dataChecker";
import verifyAccess from "../middleware/verifyAccess";
import verifyToken from "../middleware/verifyToken";

const appointmentRouter = express.Router();
appointmentRouter.post("/create",verifyToken,verifyAccess("user"),Validator.validateInput,DataChecker.ValidateEmailDuplicate,AppointmentController.createAppointment);
appointmentRouter.get("/all/:id",verifyToken,AppointmentController.getAllAppointment);
appointmentRouter.get("/:id",verifyToken,verifyAccess("user"),Validator.checkId(),Validator.validateInput,AppointmentController.getOne);

appointmentRouter.delete("/:id",verifyToken,verifyAccess("user"),Validator.checkId(),Validator.validateInput,AppointmentController.deleteAppointment);

appointmentRouter.patch("/:id",verifyToken,verifyAccess("user"),Validator.checkId(),Validator.validateInput, AppointmentController.updateAppointment);
appointmentRouter.patch("/:id/approve" , AppointmentController.acceptOneAppointment);
appointmentRouter.patch("/:id/decline" ,AppointmentController.declineOneAppointment);
//appointmentRouter.get("/all/:id",verifyToken,AppointmentController.getAllschedulerDetails);

export default appointmentRouter;