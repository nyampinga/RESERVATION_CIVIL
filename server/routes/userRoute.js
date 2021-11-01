import express  from "express";

import NormalUserController from "../controllers/NormalUserController";
import Validator from "../middleware/userValidation";
import DataChecker from "../middleware/dataChecker";
import verifyAccess from "../middleware/verifyAccess";
import verifyToken from "../middleware/verifyToken";

const userRouter = express.Router();
userRouter.post("/signup",Validator.newAccountRules(),Validator.validateInput,DataChecker.CheckAge,DataChecker.ValidateEmailDuplicate,NormalUserController.signupUser);
userRouter.post("/signin",NormalUserController.signinUser);
userRouter.delete("/:id",Validator.checkId(),Validator.validateInput,NormalUserController.DeleteUser);
userRouter.get("/all",verifyToken,verifyAccess("admin"),NormalUserController.getAllUsers);
userRouter.get("/:id",Validator.checkId(),Validator.validateInput,NormalUserController.findOneUser);
userRouter.patch("/:id",Validator.checkId(),Validator.validateInput, NormalUserController.UpdateUser);
userRouter.patch("/:id/role",verifyToken,verifyAccess("admin"),NormalUserController.UpdateOneUserRole);
userRouter.get("/all/employees",verifyToken,NormalUserController.getAllEmployees)
userRouter.get("/all/user",verifyToken,verifyAccess("admin"),NormalUserController.getAllUserss)

export default userRouter;

