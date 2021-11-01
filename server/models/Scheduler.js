import mongoose from "mongoose";


const schedulerSchema = new mongoose.Schema({

    services: String,
    sector: {
        type: mongoose.Schema.ObjectId,
        ref: "Sector"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    Employee:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    date: Date,

    timeToStart: String,
    timeToEnd: String,
    status: {
        type: String,
        enum: ["AVAILABLE", "BOOKED"],
        default: "AVAILABLE"
    },
});

schedulerSchema.pre(/^find/, function (next) {
    this.populate({
        path: "sector",
        select: "sectorName email phone address"

    }).populate({
            path:"user",
            select:"firstName lastName email phone gender"
        }).populate({
            path:"Employee",
            select:"firstName lastName email phone gender"
          });
    next();

})
const schedulerInfo = mongoose.model("Scheduler", schedulerSchema);

export default schedulerInfo;