import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { Box, Container, Heading } from '@chakra-ui/react';

//Components Stuff
import { FormInputPassword } from './Login';
import Buttons from '../../components/Layout/Buttons';
import toast from 'react-hot-toast';
import { SERVER } from '../../GlobalFunctions';


const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        password: '',
        cpassword: ''
    });
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleChangePassword = async (e) => {
        e.preventDefault();

        setLoading(true);

        console.log('formdata ', formData);

        const { password, cpassword } = formData;

        //-------Check password and cpassword
        if (password !== cpassword) {
            toast.error('password and confirm password not match')
            setFormData({ password: '', cpassword: '' });
            setLoading(false);
            return;
        }

        //----------- Call the api to reset password
        try {
            const url = `${SERVER}/user/resetPassword/${token}`;
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            };

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true) {
                toast.success(data.msg);
                navigate('/login');
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
            console.log(error);

        }

        setLoading(false);
        setFormData({ password: '', cpassword: '' });
    }

    return (
        <>
            <section id='ResetPassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Reset Your Password</Heading>

                    <form onSubmit={handleChangePassword}>

                        <FormInputPassword label={'Enter Password'} name={'password'} value={formData.password} handleChange={handleOnChange} />

                        <FormInputPassword label={'Confirm Password'} name={'cpassword'} value={formData.cpassword} handleChange={handleOnChange} />

                        <Box p='2' my='4'>
                            <Buttons type='submit' loading={loading} fontsize='lg' display={'block'} mx='auto' width="full" title={'Reset Password'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default ResetPassword
