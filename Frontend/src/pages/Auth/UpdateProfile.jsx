import React,{useState} from 'react'

import { useParams } from 'react-router-dom';

import { Box, Container, Heading } from '@chakra-ui/react';

import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'


//Components Stuff
import Buttons from '../../components/Layout/Buttons';
import FormInput from '../../components/Layout/FormInput';


const UpdateProfile = () => {
    const params = useParams();
    console.log('params ', params);

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to change the password
    const handleUpdateProfile = () => {

    }

    return (
        <>
            <section id='UpdateProfile'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Update Profile</Heading>

                    <form >

                    <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' id='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

<FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                        <Box p='2' my='4'>
                            <Buttons handleClick={handleUpdateProfile} fontsize='lg' display={'block'}  mx='auto'  width="full" title={'Update Profile'} />
                        </Box>

                    </form>

                </Container>



            </section>
        </>
    )
}

export default UpdateProfile
