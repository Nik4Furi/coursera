//----------------------- Utils Specific Stuff
const SendMail = require("../utils/SendMail"); //used to send the mail on admin

//------------ Used this controller to do other works-----------------------
function OtherController() {

    return {

        //Contact us ,send the details to admin for contacting, using POST '/api/other/contact'
        async ContactUs(req, res) {
            try {
                const { name, email, msg } = req.body;

                if (!name || !email || !msg)
                    return res.status(409).json({ success: false, msg: 'All fields are required' })

                if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email) == false)
                    return res.status(404).json({ success: false, msg: `${email} is not valid email` })

                if (name.length < 5 || msg.length < 10)
                    return res.status(409).json({ success: false, msg: 'Please fill valid details' })

                //------------ Now send the mail to admin for contact
                const to = process.env.ADMIN_MAIL || "test23@gmail.com";
                const subject = `${name} want to contact us from Coursera`;
                const text = `Hy, I am ${name}, and my mail is ${email}, please read my message --->\n ${msg}`;

                await SendMail(to, subject, text);

                return res.status(200).json({ success: true, msg: 'Your request has been sent' })


            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },


    }
}

module.exports = OtherController;