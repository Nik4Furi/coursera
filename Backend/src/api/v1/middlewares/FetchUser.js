const jwt = require("jsonwebtoken"); // For verify the users

const { JWT_SECRET_KEY } = require( "../../config/config"); //backup key to use 

//--------- Fetch user help us, to find the token of the login users

const FetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');

        if (!token)
            return res.status(200).json({ success: false, msg: 'You are not authenticate user' });

        const Secret_Key = process.env.JWT_SECRET_KEY || JWT_SECRET_KEY;
        const users = await jwt.verify(token, Secret_Key);

        req.userId = users.user.id;

        next();

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports = FetchUser