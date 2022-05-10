const jwt = require("jsonwebtoken")

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization")
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, "asma_key", (err, decoded) => {
                if (err) {
                return res.status(401).json({ message: "Invalid Token " });
                } else {
                req.decoded = decoded;
                console.log(req.decoded);
                next();
                }
            });
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    },
    unauthorizeStudent: (req, res, next) => {
        let token = req.get("authorization")
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, "asma_key", (err, decoded) => {
                if (err) {
                return res.status(401).json({ message: "Invalid Token " });
                } else {
                req.decoded = decoded;
                if(req.decoded.result.role === "student"){
                    return res.status(403).json({ message: "You are Unauthorized" });
                }
                next();
                }
            });
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    },
    unauthorizeTeacher: (req, res, next) => {
        let token = req.get("authorization")
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, "asma_key", (err, decoded) => {
                if (err) {
                return res.status(401).json({ message: "Invalid Token " });
                } else {
                req.decoded = decoded;
                if(req.decoded.result.role === "teacher" && req.decoded.result.responsible === false){
                    return res.status(403).json({ message: "You are Unauthorized" });
                }
                next();
                }
            });
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    },
    unauthorizeResponsible: (req, res, next) => {
        let token = req.get("authorization")
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, "asma_key", (err, decoded) => {
                if (err) {
                return res.status(401).json({ message: "Invalid Token " });
                } else {
                req.decoded = decoded;
                if(req.decoded.result.role === "teacher" && req.decoded.result.responsible === true){
                    return res.status(403).json({ message: "You are Unauthorized" });
                }
                next();
                }
            });
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    }
}