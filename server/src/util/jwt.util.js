const jwt = require("jsonwebtoken");

class JWTUtil {

    generateToken(payload, expiresIn) {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn }
        );
    }

    generateAccessToken(payload) {
        const expiresIn = process.env.JWT_EXPIRATION_ACCESS_TOKEN;
        return this.generateToken(payload, expiresIn);
    }

    generateRefreshToken(payload) {
        const expiresIn = process.env.JWT_EXPIRATION_REFRESH_TOKEN;
        return this.generateToken(payload, expiresIn);
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error("Invalid token: " + error.message);
        }
    }
}


module.exports = new JWTUtil();