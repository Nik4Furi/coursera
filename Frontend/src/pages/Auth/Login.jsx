import React, { useState } from 'react'

import {Link} from 'react-router-dom'

import {
    Container, VStack, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    InputLeftElement,
    Heading,
    Box,
    Text,
} from '@chakra-ui/react'

//Icons/Images Specific Stuff
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

//Components Stuff
import Buttons from '../../components/Layout/Buttons'
import FormInput from '../../components/Layout/FormInput'


const Login = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('formdata ', formData);
    }

    return (
        <>
            <section id="Login">

                <Container minH={'container.sm'} my={'5'}>

                    <Heading>Welcome to  Coursera</Heading>

                    <form style={{ minWidth: "100%" }}>
                        <VStack>

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <FormInputPassword label={'Enter Password'} name={'password'} id='password' value={formData.password} handleChange={handleOnChange} />

                            <Box w='full' my='4'>
                                <Buttons handleClick={handleSubmit} fontsize='lg' display={'block'} width="full" title={'Login'} />
                            </Box>

                        </VStack>
                    </form>

                    <Link to={'/register'} ><Text textAlign={'right'} variant={'ghost'}>Creating A New Account</Text> </Link>

                </Container>

            </section>
        </>
    )
}

export default Login


//------------ Form controller used to store only password
export const FormInputPassword = ({ label, name, id, handleChange, value }) => {

    //Function to show data of password
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <FormControl isRequired my='4'>

            <FormLabel>{label} :</FormLabel>

            <InputGroup size='md'>
                <InputLeftElement pointerEvents='none'> <RiLockPasswordLine /> </InputLeftElement>

                <Input
                    pr='4.5rem'
                    name={name}
                    type={show ? 'text' : 'password'}
                    placeholder='*********'
                    minLength={8} maxLength={120}
                    value={value}
                    onChange={handleChange}
                    id={id}
                />

                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    )
}