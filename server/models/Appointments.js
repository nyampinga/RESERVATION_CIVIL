import mongoose from "mongoose";


const AppointmentSchema = new mongoose.Schema({

    sector: {
        type: mongoose.Schema.ObjectId,
        ref: "Sector"
    },
    Scheduler: {
        type: mongoose.Schema.ObjectId,
        ref: "Scheduler"
    },
 

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    Employee:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    Comment: String,
    partnerName: {
        type: String,
        required: [true, "firstname is required"]
    },
    partnerNationalId: {
        type: String,
        required: true,
        unique: true

    },
    status: {
        type: String,
        enum: ["pending", "approve", "decline"],
        default: "pending"
    },
    registeredOn: {
        type: String,
        default: Date.now(),
    },


});

AppointmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "Scheduler",
        select: "services date timeToStart timeToEnd status ",
    }).populate({
        path:"user",
        select:"firstName lastName email phone gender"
    }).populate({
        path:"Employee",
        select:"firstName lastName email phone gender"
    }).populate({
        path: "sector",
        select: "sectorName email phone address"

    
      });
next();

})
const appointmentInfo = mongoose.model("Appointment", AppointmentSchema);
export default appointmentInfo;