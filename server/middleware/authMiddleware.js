import { verifyToken } from "../utils/jwt.js";

export function protect(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    req.user = decoded; 
    next();
}
