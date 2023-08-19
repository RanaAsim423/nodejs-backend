import pkg from "jsonwebtoken";
const { verify } = pkg;

export function requireSignin(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        // console.log("hello",req.user);
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
}

export function userMiddleware(req, res, next) {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
}

export function adminMiddleware(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "Admin access denied" });
    }else{
        console.log("hello",req.user.role);
        next();
    }

}
