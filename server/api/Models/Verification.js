import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Verification = mongoose.models.Verification || mongoose.model("Verification", verificationSchema);

export default Verification;
