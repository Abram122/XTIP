import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import Verification from "../Models/Verification.js";
import { generateToken } from "../utils/jwt.js";
import { generateCode, sendCode } from "./verificationController.js";

//  Register User
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const normalizedEmail = email.toLowerCase().trim()

        if (!/^[a-zA-Z ]{3,30}$/.test(fullName)) {
            return res.status(400).json({ message: "Invalid full name" })
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters, contain uppercase, number and symbol",
            })
        }

        const existingUser = await User.findOne({ email: normalizedEmail }).populate("verification")

        if (existingUser) {
            if (!existingUser.verification?.verified) {
                await sendCode({ body: { email: normalizedEmail } }, res)
                return
            }
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const verification = await Verification.findOneAndUpdate(
            { email: normalizedEmail },
            {
                code: generateCode(),
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                verified: false,

            },
            { upsert: true, new: true }
        )

        const user = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            verification: verification._id,
            authProvider: "local",
        });

        await sendCode({ body: { email: normalizedEmail } }, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        }).populate("verification");

        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid email or password" });

        if (!user.verification?.verified) {
            return res.status(403).json({
                message:
                    "Your email is not verified. Please verify your account to continue.",
            });
        }

        const token = generateToken(user._id);

        // ✅ Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Response
        res.json({
            message: "Login successful",
            user: { id: user._id, fullName: user.fullName, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
export const saveAuthUser = async (req, res) => {
    try {
        const { email, name, provider } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Find existing user
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.fullName = name || user.fullName;
            user.updatedAt = new Date();
            await user.save();
        } else {
            // Create new user
            user = new User({
                fullName: name || "Unknown",
                email,
                authProvider: provider,
            });
            await user.save();
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error("Error saving auth user:", err);
        res.status(500).json({ error: "Server error" });
    }
};
export const getProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user });
        if (!user) {
            res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                bio: user.bio,
                sector: user.sector,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error saving auth user:", err);
        res.status(500).json({ error: "Server error" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { fullName, bio, sector } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user,
            { fullName, bio, sector },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

