// Application Specific Stuff
let SERVER = "http://localhost"
let PORT = 8000
let VERSION = 'v1'

// Database Specific Stuff
let MONGO_URI = "mongodb://127.0.0.1:27017/coursera"

// Authentication / Secret Keys Specific Stuff
let JWT_SECRET_KEY = "courserahelptheuserstomaketheirdreamscome@itsamernstackapptowatchthecourse"

// Frontend url , use in reset password route
let FRONTEND_URL = 'http://localhost:3000';

// SMTP Configuration ,Use any service which is send the mail
let SMTP_HOST = "<Host>"
let SMTP_PORT = "<Port>"
let SMTP_AUTH_USER = "<User>"
let SMTP_AUTH_PASS = "<Pass>"
module.exports = { SERVER, PORT, MONGO_URI, JWT_SECRET_KEY, VERSION, FRONTEND_URL };