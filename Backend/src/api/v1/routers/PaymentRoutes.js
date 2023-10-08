const Routers = require('express').Router();

//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser');

//------------------ Controllers Specific Stuff-------------------------X
const PaymentController = require('../controllers/PaymentController');

//----------------------- INitizlalzing auth apis's routes here -------------------X

Routers.get('/getSecretKey',FetchUser,PaymentController().getSecretKey); //Get the secret key of razorpay, using GET '/api/payment/getSecretKey'
Routers.get('/subscribe',FetchUser,PaymentController().Subscribe); //Provide the subscribtion to the users to access the lectures, using GET '/api/payment/subscribe'
Routers.post('/paymentVerification',PaymentController().paymentVerification); //Verfiying the payment of the user, after the payment, using POST '/api/payment/paymentVerification' 
Routers.post('/cancelSubscription',FetchUser,PaymentController().cancelSubscription); //Cancel the subscription in under 7 days, using PUT '/api/payment/cancelSubscription' 

module.exports = Routers