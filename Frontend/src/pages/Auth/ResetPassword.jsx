import React,{useState} from 'react'

import { useParams } from 'react-router-dom';

import { Box, Container, Heading } from '@chakra-ui/react';

//Components Stuff
import { FormInputPassword } from './Login';
import Buttons from '../../components/Layout/Buttons';


const ResetPassword = () => {
    const params = useParams();
    console.log('params ', params);

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        password: '',
        cpassword: ''
    });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleChangePassword = () => {

    }

    return (
        <>
            <section id='ResetPassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Reset Your Password</Heading>

                    <form >

                        <FormInputPassword label={'Enter Password'} name={'password'} id='password' value={formData.password} handleChange={handleOnChange} />

                        <FormInputPassword label={'Confirm Password'} name={'cpassword'} id='cpassword' value={formData.cpassword} handleChange={handleOnChange} />

<<<<<<< HEAD
                        <Box p='2' my='4' display={'block'} mx='auto' >
                            <Buttons type='submit' loading={loading} fontsize='lg' width="full" title={'Reset Password'} />
=======
                        <Box p='2' my='4'>
                            <Buttons handleClick={handleChangePassword} fontsize='lg' display={'block'}  mx='auto'  width="full" title={'Reset Password'} />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default ResetPassword
