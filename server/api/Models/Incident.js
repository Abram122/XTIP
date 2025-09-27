import mongoose from "mongoose"

const incidentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        severity: { type: String, enum: ["High", "Medium", "Low"], required: true },
        status: { type: String, default: "Open" },
        notes: { type: [String], default: [] },
        reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        location: { type: String, default: "Unknown" },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default mongoose.model("Incident", incidentSchema)
