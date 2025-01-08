import express from "express";
import {  getUserData, login, logout, register } from "../controllers/user.controller.js";
import isAdmin from '../middlewares/isAdmin.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.get('/check-admin', isAuthenticated, isAdmin);
// Protected Admin Dashboard Route
router.get('/admin-dashboard', isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard!' });
  });
router.route('/get').get(getUserData);
export default router;