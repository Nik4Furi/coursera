//--------------------- Function to checking the user only accessed the lectues if is admin or is payment is done
const SubscribeLecture = async(req,res,next)=>{
    try {

        if(req.user.role !== 'admin' || req.user.subscription.status !== 'active')
            return res.status(409).json({success:false,msg:"Can't access the lecture, please subscirbe first"})

        next();

    } catch (error) { return res.status(500).json({success:false,msg:error}) }
}

module.exports = SubscribeLecture;