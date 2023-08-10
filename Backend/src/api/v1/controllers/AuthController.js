//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash
const jwt = require('jsonwebtoken'); // Tokenized our users
const UserModel = require('../models/UserModel'); //User modal

const crypto = require('crypto'); //Use to ciper the tokens 

const {JWT_SECRET_KEY, FRONTEND_URL} = require('../../config/config');
const SendMail = require('../utils/SendMail');

//------------------ Creating the AuthControllers to authenticate the users -----------X
function AuthController() {
    return {
        //1. Register the users, using POST '/api/user/register'
        async Register(req,res){
            
            try {
                //--------- Req.body content
                const {name,email,password,cpassword} = req.body;

                //Requring all the specific fields
                if(!name || !email || !password || !cpassword) {return res.status(404).json({success:false,msg:"All fields are required"})};

                if(password.length < 8 || cpassword.length < 8) 
                    return res.status(404).json({success:false,msg:"Password must be 8 char long"})

                //check password and confirm password match
                if(password !== cpassword) {return res.status(404).json({success:false,msg:"Password and ConfrimPassword did not match"})};

                // Check the user is already register
                let users = await UserModel.findOne({email})
                if(users) { return res.status(401).json({success:false,msg:"this crenditentals's user is already exist"})};

                //Converting the password into hash
                let hashPassword = await bcrypt.hash(password,10);

                //Register the users
                users = await UserModel({
                    name,
                    email,
                    password:hashPassword,                    
                })
                await users.save();

                return res.status(200).json({success:true,msg:'You are successfully register',users});
                
            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        //2. Login the users, using POST '/api/user/login'
        async Login(req,res){
            try {
                //--------- Req.body content
                const {email,password} = req.body;

                //Requring all the specific fields
                if(!email || !password ) {return res.status(404).json({success:false,msg:"All fields are required"})};
                
                // Check the user is not already register
                let users = await UserModel.findOne({email})
                if(!users) { return res.status(401).json({success:false,msg:"this crenditentals's user is not register, Plz login first"})};

                //Comparing the password of register and login user
                let hashPassword = await bcrypt.compare(password,users.password)
                if(!hashPassword) { return res.status(404).json({success:false,msg:"Your credentials not right, plz re-write!"})}

                // Now create the token to authorizing the users
                const payloads = {
                    user : {id : users._id}
                }
                const Secret_Key = process.env.JWT_SECRET_KEY || JWT_SECRET_KEY
                const token = await jwt.sign(payloads,Secret_Key,{expiresIn : '10d'})
                
                return res.status(200).json({success:true,msg:'You are successfully login',token});
                
            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        //3. Get the info of login user, using GET '/api/user/getUser'
        async getUser(req,res){
            try {
                // console.log(req.user);
                return res.status(200).json({success:true,msg:'User found successfully',user:req.user});

            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        //4. Change Password ,if user write old password is right!, using PUT '/api/user/changePassword'
        async changePassword(req,res){
            try {
                //1. Get constraint from req.body
                const {oldPassword, newPassword} = req.body;

                if(!oldPassword || !newPassword) return res.status(404).json({success:false,msg:'All fields are required'})

                const isMatch = bcrypt.compare(oldPassword,req.user.password);
                if(!isMatch) return res.status(401).json({success:false,msg:"Your old password is not right"})

                req.user.password = await bcrypt.hash(newPassword,10);

                await req.user.save();

                return res.status(200).json({success:true,msg:'Your password is change successfully',user:req.user});

            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        // Updating the profile by the user, using PUT '/api/user/updateProfile'
        async updateProfile(req,res){
            try {
                //Get constraints from req.body
                const {name,email} = req.body;

                //Now update the data
                if(email) req.user.email = email;
                if(name) req.user.name = name;

                await req.user.save();

                return res.status(200).json({success:true,msg:'Your profile is updated successfully',user:req.user})

            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        //Forget password, is help the users when they try to login , using POST '/api/user/forgetPassword'
        async forgetPassword(req,res){

            try {
                //Get constraints from the users
                const {email} = req.body;

                //Find the user by the id
                const user = await UserModel.findOne({email});

                if(!user) return res.status(404).json({success:false,msg:'User is not found,Please check credentials'});

                //After the user found send the mail, with token and reset password token 
                //1. Create the token 
                const resetToken = crypto.randomBytes(20).toString('hex'); //hex the token is built in

                //2. Hash the user reset token and update
                user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

                console.log('check reset tokens ',user.resetPasswordToken,resetToken);

                //3. Define the time to reset the token
                user.resetPasswordTokenTime = Date.now()+15*60*60*1000; //15 minutes;


                //---------------- Now we move to send the mail
                const FrontendUrl = process.env.FRONTEND_URL || FRONTEND_URL;
                const url = `${FrontendUrl}/resetPassword/${resetToken}`;

                const msg = `Click on ${url} to reset your password, if you haven't send, then please ignore this`;

                //Send the mail
                await SendMail(user.email,'Coursera reset password',msg);

                return res.status(200).json({success:true,msg:`Check ${user.email} to reset password`})

            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        },

        //After click on reset token, we reset the password, using POST '/api/user/resetPassword/:token'
        async resetPassword(req,res){
            try {
                //Get the constraints from the user
                const {password,cpassword} = req.body;

                if(password !== cpassword) return res.status(404).json({success:false,msg:'Your password and confirm password not match'})

                //Get the constraints from params, to verify user
                let {token} = req.params;

                token = crypto.createHash('sha256').update(token).digest('hex');

                //Find the user in according of the token 
                let user = await UserModel.find({resetPasswordToken:token,resetPasswordTokenTime : { $lt : Date.now() } });

                console.log('reset password user is ',user);

                if(!user) return res.status(401).json({success:false,msg:'Token is expires or user is not found'});

                //After finding update the password or can say hash the password
                user.password = await bcrypt.hash(password,10);

                await user.save();

                return res.status(200).json({success:true,msg:'Your password is reset successfully',user});

            } catch (error) { return res.status(500).json({success:true,msg:`${error.message}` });  }
        }


    }
}

module.exports = AuthController;