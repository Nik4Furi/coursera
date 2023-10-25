import React, { useState } from 'react'

import { Box, Container, Heading } from '@chakra-ui/react'

import toast from 'react-hot-toast'

//Global Functions
import { SERVER } from '../../GlobalFunctions'

//Icons/images Stuff
import { AiOutlineMail } from 'react-icons/ai'

//Components Stuff
import FormInput from '../../components/Layout/FormInput'
import Buttons from '../../components/Layout/Buttons'


const ForgetPassword = () => {

    //------------ Form Specific Stuff--------------------
    const [formData, setFormData] = useState({ email: '' });
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle the forget password stuff
    const handleForgetPassword = async (e) => {

        e.preventDefault();

        setLoading(true);

        // ------------ Validate the email --------X 
        if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email)) === false) {
            toast.error(`${formData.email} is not valid`)
            setFormData({ email: "" })
            setLoading(false)
            return;
        }

        //----------- Call the api to send mail for forget password
        try {

            const url = `${SERVER}/user/forgetPassword`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            };

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true)
                toast.success(data.msg);

            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
        }

        setLoading(false);
        setFormData({ email: '' })
    }


    return (
        <>
            <section id='ForgetPassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Forget Pasword</Heading>

                    <form onSubmit={handleForgetPassword}>

                        <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                        <Box my='4' p='2'>
                            <Buttons type={'submit'} loading={loading} fontsize='lg' display={'block'} mx='auto' width="full" title={'Request To Forget'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default ForgetPassword
