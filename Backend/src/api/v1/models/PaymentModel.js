const mongoose = require('mongoose')

//Create the schema to save payment details
const PaymentSchema = new mongoose.Schema({
    razorpay_signature:String,
    razorpay_payment_id:String,
    razorpay_subscription_id:String
},{timestamps:true})

const PaymentModel = mongoose.model('Payment',PaymentSchema);

module.exports = PaymentModel;