import mongoose from "mongoose";
import { type } from "os";
const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    shortDescription:{type:String,required:true},
    longDescription:{type:String,required:true},

},{timestamps:true});
export const Post = mongoose.model('Post', postSchema);