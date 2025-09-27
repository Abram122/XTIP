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
        minlength: [8, "Password must be at least 8 characters long"],
    },
    authProvider: {
        type: String,
        enum: ["local", "google", "github"],
        default: "local",
    },
    verification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verification",
    },
    bio: {
        type: String,
        match: [/^[a-zA-Z0-9\s]+$/, "Name must contain only letters and spaces"],
    },
    sector: {
        type: String,
        match: [/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;