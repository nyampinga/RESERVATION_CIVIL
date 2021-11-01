import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./server/routes/userRoute";
import sectorRouter from "./server/routes/sectorRoute";
import schedulerRouter from "./server/routes/schedulerRoute";
import bodyParser from 'body-parser';
import appointmentRouter from "./server/routes/appointmentRoute";
import cors from "cors";

dotenv.config({path:'./.env'});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/civil/v1/user", userRouter);
app.use("/civil/v1/sector", sectorRouter);
app.use("/civil/v1/scheduler", schedulerRouter);
app.use("/civil/v1/appointment", appointmentRouter);


app.use('/',(req,res)=>{
    res.status(404).send({
        status:404,
        message:"this route does not exist"
    })
})

const port = process.env.PORT;
const databaseUrl=process.env.DATABASE;

mongoose.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("Databse connected succesfully")); 
//port:4040
app.listen(port, ()=>{
    console.log(databaseUrl);
    console.log(`server is running on port ${port}`);
})
export default app;