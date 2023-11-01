import React, { useState } from 'react'

import { Box, Container, Heading } from '@chakra-ui/react';

//--------Redux Store specific stuff
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdateUserPassword } from '../../Store/UsersSlice';

//Components Stuff
import { FormInputPassword } from './Login';
import Buttons from '../../components/Layout/Buttons';


const ChangePassword = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user);

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        oldpassword: '',
        newpassword: ''
    });

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleChangePassword = async (e) => {
        e.preventDefault();

        dispatch(handleUpdateUserPassword(formData))

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

                        <Box p='2' my='4' display={'block'} mx='auto'>
                            <Buttons type='submit' loading={loading} fontsize='lg'  width="full" title={'Change Password'} />
                        </Box>

                    </form>

                </Container>

            </section>
        </>
    )
}

export default ChangePassword
