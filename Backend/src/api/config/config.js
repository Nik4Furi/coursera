// Application Specific Stuff
const SERVER = "http://localhost"
const PORT = 8000
const VERSION = 'v1'

// Database Specific Stuff
const MONGO_URI = "mongodb://127.0.0.1:27017/coursera"

// Authentication / Secret Keys Specific Stuff
const JWT_SECRET_KEY = "courserahelptheuserstomaketheirdreamscome@itsamernstackapptowatchthecourse"

// Frontend url , use in reset password route
const FRONTEND_URL = 'http://localhost:3000';

// SMTP Configuration ,Use any service which is send the mail
const SMTP_HOST = "<Host>"
const SMTP_PORT = "<Port>"
const SMTP_AUTH_USER = "<User>"
const SMTP_AUTH_PASS = "<Pass>"

// # Cloudinary Configuration
const CLOUDINARY_NAME = '<name>'
const CLOUDINARY_API_KEY = '<api_key>'
const CLOUDINARY_API_SECRET = '<api_secret>'

module.exports = { SERVER, PORT, MONGO_URI, JWT_SECRET_KEY, VERSION, FRONTEND_URL, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME };