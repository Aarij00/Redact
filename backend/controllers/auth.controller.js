import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import HRManager from "../models/hrManager.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {email, password, name} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"});
        }

        const existingUser = await HRManager.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "email is already in use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new HRManager({
            email: email,
            name: name,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller.", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const hrm = await HRManager.findOne({ email });
        const isCorrectPassword = await bcrypt.compare(password, hrm?.password || "");

        if (!hrm || !isCorrectPassword) {
            return res.status(400).json({ error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(hrm._id, res);

        res.status(200).json({
            message: "logged in successfully",
            _id: hrm._id,
            email: hrm.email,
            name: hrm.name,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}