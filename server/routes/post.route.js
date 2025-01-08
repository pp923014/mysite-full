import express from "express";
import upload from "../middlewares/multer.js";
import { addFeature, addPost, getFeature, getInternship } from "../controllers/post.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
// i want that only admin can access this page and add posts

const router = express.Router();
router.route("/addpost").post(addPost);
router.route('/getInternship').get(getInternship)
router.route('/feature').post(addFeature) 
router.route("/getfeature").get(getFeature);
export default router;