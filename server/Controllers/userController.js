import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import Verification from "../Models/Verification.js";
import { generateToken } from "../utils/jwt.js";
import { generateCode , sendCode } from "./verificationController.js";

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
        })

        await sendCode({ body: { email: normalizedEmail } }, res)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email.toLowerCase().trim() }).populate("verification")

        if (!user) return res.status(400).json({ message: "Invalid email or password" })

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" })

        if (!user.verification?.verified) {
            return res.status(403).json({
                message: "Your email is not verified. Please verify your account to continue.",
            })
        }

        const token = generateToken(user._id)

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email },
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

