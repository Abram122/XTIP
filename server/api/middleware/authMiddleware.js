import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            return next();
        } catch (err) {
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data?.user) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }

        let user = await User.findOne({ email: data.user.email });
        if (!user) {
            user = await User.create({
                fullName: data.user.user_metadata.full_name || "Unknown",
                email: data.user.email,
                authProvider: "supabase",
                verification: null,
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
