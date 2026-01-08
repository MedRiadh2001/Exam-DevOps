require("dotenv").config();
const config={
    DB_URL:process.env.DATABASE_URL || "mongodb://mongodb-service:27017/exam"
}
module.exports=config;