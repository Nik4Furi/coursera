import React, { useState } from 'react'

import { Box, Container, Heading } from '@chakra-ui/react';

import toast from 'react-hot-toast'

//Icons Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

//Global Function Stuff
import { SERVER, Token } from '../../GlobalFunctions'

//Components Stuff
import Buttons from '../../components/Layout/Buttons';
import FormInput from '../../components/Layout/FormInput';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../Store/UsersSlice';


const UpdateProfile = ({ user }) => {

    const dispatch = useDispatch();
    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setLoading(true);

        // ------------------ Call the api to updating user profile 
        try {
            const url = `${SERVER}/user/updateProfile`;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'auth-token': Token
                },
                body: JSON.stringify(formData)
            };

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true) {

                toast.success(data.msg);
                dispatch(updateProfile({ name: formData.name, email: formData.email }))
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
        }

        setLoading(false);
        setFormData({ name: '', email: '' });
    }

    return (
        <>
            <section id='UpdateProfile'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Update Profile</Heading>

                    <form onSubmit={handleUpdateProfile}>

                        <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                        <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                        <Box p='2' my='4' display={'block'} mx='auto' >
                            <Buttons loading={loading} type='submit' fontsize='lg' width="full" title={'Update Profile'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default UpdateProfile
