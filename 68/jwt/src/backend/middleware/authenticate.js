import jwt from 'jsonwebtoken'
const JWT_SECRET = "thbt";

export default function (req, res, next){
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({msg: 'Access denied'});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({msg: "Invalid or expired token"});
    }
}