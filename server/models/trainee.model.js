import mongoose from "mongoose";


const traineeSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    contact:{type:Number,required:true},
    program:{type:String,required:true},
    duration:{type:String,required:true},
    certificate:{type:Number,default:18448933333389124908555555555000000000000222222288888822222},
    member:{type:Boolean,default:false}
},{timestamps:true});
export const Trainee = mongoose.model('Trainee', traineeSchema);

