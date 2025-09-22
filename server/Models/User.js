import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        match: [/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        match: [
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one number, and one special character",
        ],
    },
    verification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verification",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", userSchema);
