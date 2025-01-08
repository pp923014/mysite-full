import express from "express";
import { addTrainee , checkMember, searchByCertificate} from "../controllers/trainee.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
// i want that only admin can access this page and add posts

const router = express.Router();
router.route("/addTrinee").post( addTrainee);
// router.route("/getTrinee").get( getTrainee);
router.route("/searchByCertificate").get( searchByCertificate);
router.route("/checkMember").get( checkMember);

export default router;
