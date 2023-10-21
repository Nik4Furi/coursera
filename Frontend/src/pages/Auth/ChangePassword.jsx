import React, { useState } from 'react'

import { useParams } from 'react-router-dom';

import { Box, Container, Heading } from '@chakra-ui/react';

//Components Stuff
import { FormInputPassword } from './Login';
import Buttons from '../../components/Layout/Buttons';
import { SERVER, Token } from '../../GlobalFunctions';
import toast from 'react-hot-toast';


const ChangePassword = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        oldpassword: '',
        newpassword: ''
    });
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        setLoading(true);

        //-------- Call the api to change password
        try {
            const url = `${SERVER}/user/changePassword`;
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": Token
                },
                body: JSON.stringify(formData)
            }

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true)
                toast.success(data.msg);
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
            console.log(error)
        }

        setLoading(false);
        setFormData({ oldpassword: '', newpassword: '' })

    }

    return (
        <>
            <section id='ChangePassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Change Your Password</Heading>

                    <form onSubmit={handleChangePassword}>

                        <FormInputPassword label={'Enter Old Password'} name={'oldpassword'} value={formData.oldpassword} handleChange={handleOnChange} />

                        <FormInputPassword label={'Enter New Password'} name={'newpassword'} value={formData.newpassword} handleChange={handleOnChange} />

                        <Box p='2' my='4'>
                            <Buttons type='submit' loading={loading} fontsize='lg' display={'block'} mx='auto' width="full" title={'Change Password'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default ChangePassword
