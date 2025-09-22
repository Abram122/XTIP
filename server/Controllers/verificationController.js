import Verification from "../Models/Verification.js";

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const code = generateCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

        let verification = await Verification.findOne({ email });

        if (verification) {
            verification.code = code;
            verification.expiresAt = expiresAt;
            verification.verified = false;
        } else {
            verification = new Verification({ email, code, expiresAt });
        }

        await verification.save();
        
        // to check you functionality t3tz 
        console.log(`Verification code for ${email}: ${code}`);

        res.json({ message: "Verification code sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const verification = await Verification.findOne({ email });

        if (!verification)
            return res.status(404).json({ message: "No verification request found" });

        if (verification.verified)
            return res.status(400).json({ message: "Email already verified" });

        if (verification.expiresAt < new Date())
            return res.status(400).json({ message: "Code expired, please resend" });

        if (verification.code !== code)
            return res.status(400).json({ message: "Invalid verification code" });

        verification.verified = true;
        await verification.save();

        res.json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const verification = await Verification.findOne({ email });

        if (!verification)
            return res.status(404).json({ message: "No verification request found" });

        if (verification.verified)
            return res.status(400).json({ message: "Email already verified" });

        const code = generateCode();
        verification.code = code;
        verification.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await verification.save();

        console.log(`📧 Resent verification code for ${email}: ${code}`);

        res.json({ message: "Verification code resent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
