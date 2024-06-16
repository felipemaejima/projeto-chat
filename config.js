import dotenv from "dotenv";

dotenv.config();

const config = { 
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USER || "root",
    dbPass: process.env.DB_PASS || "",
    dbName: process.env.DB_NAME || "chat",
    JWTSecret: process.env.JWT_SECRET || "secret",
    sessionTime: process.env.SESSION_TIME || 30,
    passMinLength: process.env.PASSWORD_MIN_LENGTH || 3, 
}

export default config