//---------------- Instance of the razorpay payment 
const Razorpay = require('razorpay');
const crypto = require('crypto');
const PaymentModel = require('../models/PaymentModel');
const { RefundDays } = require('../utils/AttributesTypes');

const instance = new Razorpay({ //used to payment gateway
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


//--------------- Controlling all the payments related configurations and actions
function PaymentController() {
    return {
        //Send the secret key using api call, using GET '/api/payment/getSecret'
        async getSecretKey(req, res) {
            try {
                return res.status(200).json({ success: true, msg: '', secretKey: process.env.RAZORPAY_SECRET_KEY });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Subscribe the user, can pay for vidoes, using POST '/api/payment/subscribe'
        async Subscribe(req, res) {
            try {

                const subscription = await instance.subscriptions.create({
                    plan_id: process.env.RAZORPAY_PLAN_ID,
                    total_count: 12,
                    customer_notify: 1
                });

                // console.log('subscription is ',subscription);

                req.user.subscription.id = subscription.id;
                req.user.subscription.status = subscription.status;

                await req.user.save();

                return res.status(200).json({ success: true, msg: 'Your subscription is created successfully', subscriptionId: subscription.id })

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },

        //Verified the payment, after doing the subscription payment, using POST '/api/payment/paymentverify'
        async paymentVerification(req, res) {
            try {
                const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

                //Generate the signature , and try to check is it match with razorpay signature
                const body = razorpay_payment_id + '|' + razorpay_subscription_id;

                const generateSign = crypto.createHash('sha256', process.env.RAZORPAY_SECRET_KEY).update(body, 'utf-8').digest('hex');

<<<<<<< HEAD
                if (generateSign != razorpay_signature) {

                    res.redirect(`${process.env.FRONTEND_URL}/paymenterror`);
                    return;
                }

                //---------Finding the users
                const user = await UserModel.findById(user_id);

                if(!user) return res.status(409).json({success:false,msg:'User not found to pay'})

                user.subscription.status = 'active';
=======
                if (generateSign != razorpay_signature)
                    res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);

>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

                //Then save it in payment model
                await PaymentModel.create({
                    razorpay_payment_id, razorpay_subscription_id, razorpay_signature
                });

                req.user.subscription.status = 'active';

                await req.user.save();

                res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`);

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },

        //Canceling the subscription in between 7 days, using PUT '/api/payment/cancelSubscription'
        async cancelSubscription(req, res) {
            try {
                //Cancelling the subscription first
                const subscriptionId = req.user.subscription.id;

                if (!subscriptionId)
                    return res.status(409).json({ success: false, msg: "You didn't have subscription, please subscribe" })

                //------------ Finding the payment data, help of subscription id
                const payment = await PaymentModel.findOne({ razorpay_subscription_id: subscriptionId });

                // console.log(subscriptionId,'subscription', 'and',payment,'payment')

                if (!payment)
                    return res.status(409).json({ success: false, msg: "You didn't have subscription, please subscribe" })

<<<<<<< HEAD
                // await instance.subscriptions.cancel(subscriptionId); //Cancelling the subscription

                instance.subscriptions.cancel(subscriptionId);
=======
                await instance.subscriptions.cancel(subscriptionId); //Cancelling the subscription
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

                //--------------- Now we start to find is refunding the payment or not
                const gap = Date.now() - payment.createdAt;
                let refund = false;

                if (RefundDays > gap) { //7 >5
<<<<<<< HEAD
                    // refund the user payment
                    // await instance.subscriptions.refund(payment.razorpay_payment_id);

                    await instance.payments.refund(payment.razorpay_payment_id);
=======
                    //o/w refund the user payment
                    await instance.subscriptions.refund(payment.razorpay_payment_id);
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

                    refund = true;
                }
                  
                //-------- Removing the instances
<<<<<<< HEAD
                await PaymentModel.deleteOne({razorpay_subscription_id : subscriptionId});
=======
                await payment.deleteOne({razorpay_subscription_id:subscriptionId});
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

                req.user.subscription.id = undefined
                req.user.subscription.status = undefined

                await req.user.save();

                return res.status(200).json({ success: true, msg: refund ? "Your subscription is cancel, but can't refund becuase your are late": "Your subscription is cancel, you received your refund payment"});

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        }
    }
}

module.exports = PaymentController;