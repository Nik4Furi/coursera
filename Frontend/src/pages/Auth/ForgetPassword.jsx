import React,{useState} from 'react'

import { Box, Container, Heading } from '@chakra-ui/react'

//Icons/images Stuff
import { AiOutlineMail } from 'react-icons/ai'

//Components Stuff
import FormInput from '../../components/Layout/FormInput'
import Buttons from '../../components/Layout/Buttons'

const ForgetPassword = () => {

    //------------ Form Specific Stuff--------------------
    const [formData, setFormData] = useState({ email: '' });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData(e.target.value);

    //Function to handle the forget password stuff
    const handleForgetPassword = () => {

    }


    return (
        <>
            <section id='ForgetPassword'>

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Forget Pasword</Heading>

                    <form >
                        <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

<<<<<<< HEAD
                        <Box my='4' p='2' display={'block'} mx='auto'>
                            <Buttons type={'submit'} loading={loading} fontsize='lg' width="full" title={'Request To Forget'} />
=======
                        <Box my='4' p='2'>
                            <Buttons handleClick={handleForgetPassword} fontsize='lg' display={'block'} mx='auto' width="full" title={'Request To Forget'} />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
                        </Box>

                    </form>
                    
                </Container>



            </section>
        </>
    )
}

export default ForgetPassword
