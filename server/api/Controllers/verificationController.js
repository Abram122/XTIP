import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Verification from "../models/Verification.js"
import { generateToken } from "../utils/jwt.js"
import { sendEmail } from "../utils/sendEmail.js"

export const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString()

const getEmailTemplate = (code) => `
  <div style="background-color:#0f172a; color:#f8fafc; font-family:Arial, sans-serif; padding:40px; text-align:center;">
    <h1 style="color:#22d3ee; font-size:28px;">🔐 Email Verification</h1>
    <p style="font-size:16px; color:#cbd5e1; margin-top:10px;">
      Use the following code to verify your email address:
    </p>
    <div style="margin:30px auto; max-width:300px; background:#1e293b; padding:20px; border-radius:8px; border:1px solid #334155;">
      <h2 style="font-size:32px; color:#22d3ee; margin:0;">${code}</h2>
    </div>
    <p style="font-size:14px; color:#94a3b8; margin-top:20px;">
      This code will expire in <b>10 minutes</b>.
    </p>
    <footer style="margin-top:40px; font-size:12px; color:#475569;">
      &copy; ${new Date().getFullYear()} Cyber Security Platform. All rights reserved.
    </footer>
  </div>
`


export const sendCode = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ message: "Email is required" })

        const code = generateCode()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
        let verification = await Verification.findOne({ email })

        if (verification) {
            verification.code = code
            verification.expiresAt = expiresAt
            verification.verified = false
        } else {
            verification = new Verification({ email, code, expiresAt })
        }

        await verification.save()
        await sendEmail(email, "Your Verification Code", getEmailTemplate(code))
        console.log(`Verification code for ${email}: ${code}`)
        res.json({ message: "Verification code sent successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body
        const verification = await Verification.findOne({ email })
        if (!verification) return res.status(404).json({ message: "No verification request found" })
        if (verification.verified) return res.status(400).json({ message: "Email already verified" })
        if (verification.expiresAt < new Date()) return res.status(400).json({ message: "Code expired, please resend" })
        if (verification.code !== code) return res.status(400).json({ message: "Invalid verification code" })

        verification.verified = true
        await verification.save()

        res.json({ message: "Email verified successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const resendCode = async (req, res) => {
    try {
        const { email } = req.body
        const verification = await Verification.findOne({ email })
        if (!verification) return res.status(404).json({ message: "No verification request found" })
        if (verification.verified) return res.status(400).json({ message: "Email already verified" })

        const code = generateCode()
        verification.code = code
        verification.expiresAt = new Date(Date.now() + 10 * 60 * 1000)
        await verification.save()
        await sendEmail(email, "Resend Verification Code", getEmailTemplate(code))

        res.json({ message: "Verification code resent successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
