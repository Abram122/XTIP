import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import Verification from "../Models/Verification.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verification = await Verification.create({
            email,
            code: Math.floor(100000 + Math.random() * 900000).toString(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        });

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verification: verification._id,
        });

        res.status(201).json({
            message: "User registered successfully. Verification code sent.",
            userId: user._id,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate("verification");

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

        if (!user.verification?.verified) {
            return res.status(403).json({ message: "Email not verified" });
        }

        const token = generateToken(user._id);

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
