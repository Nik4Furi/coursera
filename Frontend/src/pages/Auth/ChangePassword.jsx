import React,{useState} from 'react'

import { useParams } from 'react-router-dom';

import { Box, Container, Heading } from '@chakra-ui/react';

//Components Stuff
import { FormInputPassword } from './Login';
import Buttons from '../../components/Layout/Buttons';


const ChangePassword = () => {
    const params = useParams();
    console.log('params ', params);

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        opassword: '',
        npassword: ''
    });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleChangePassword = () => {

    }

    return (
        <>
            <section id='ChangePassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Change Your Password</Heading>

                    <form >

                        <FormInputPassword label={'Enter Old Password'} name={'opassword'} id='opassword' value={formData.opassword} handleChange={handleOnChange} />

                        <FormInputPassword label={'Enter New Password'} name={'npassword'} id='npassword' value={formData.npassword} handleChange={handleOnChange} />

                        <Box p='2' my='4'>
                            <Buttons handleClick={handleChangePassword} fontsize='lg' display={'block'}  mx='auto'  width="full" title={'Change Password'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default ChangePassword
