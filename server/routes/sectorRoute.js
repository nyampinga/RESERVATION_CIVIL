import express  from "express";

import SectorUserController from "../controllers/SectorUserController";
import Validator from "../middleware/userValidation";
import DataChecker from "../middleware/dataChecker";
import verifyAccess from "../middleware/verifyAccess";
import verifyToken from "../middleware/verifyToken";

const sectorRouter = express.Router();
sectorRouter.post("/create",verifyToken,verifyAccess("admin"),Validator.validateInput,DataChecker.ValidateEmailDuplicate,SectorUserController.createSector);
sectorRouter.get("/all",verifyToken,SectorUserController.getAllSector);
sectorRouter.get("/:id",Validator.checkId(),Validator.validateInput,SectorUserController.getOne);

sectorRouter.delete("/:id",verifyToken,verifyAccess("admin"),Validator.checkId(),Validator.validateInput,SectorUserController.deleteSector);

sectorRouter.patch("/:id",verifyToken,verifyAccess("admin"),Validator.checkId(),Validator.validateInput, SectorUserController.updateSector);
//sectorRouter.get("/all/:id",verifyToken,SectorUserController.getAllUserSector);




export default sectorRouter;

