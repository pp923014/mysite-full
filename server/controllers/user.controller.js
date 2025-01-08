import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register code
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
         // agar koi input field miss ho to
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
          // agar user pehle se exist karta ho
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);  //we are hashing the password so that if our db hacked the hacker can't get the actual password
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error,"from signup");
    }
}

//how user can login to there accunt
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const token = jwt.sign(
            { userId: user._id,isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Exclude sensitive data from the response
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };

        // Store the token in the local address via the response
        return res.status(201).json({
            message: `User created successfully. Welcome back ${user.username}!`,
            success: true,
            token,
            user,
           
        });
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// logout functionality
export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Decode the token to get userId
    const user = await User.findById(decoded.userId); // Find the user by userId (from token)

    if (user) {
      // Return the user details (you can modify this to return only specific data)
      res.status(200).json({
        username: user.username,
        email: user.email,
        _id: user._id,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
  };