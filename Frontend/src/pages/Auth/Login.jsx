import React, { useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'

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

import toast from 'react-hot-toast'

//Icons/Images Specific Stuff
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

//Components Stuff
import Buttons from '../../components/Layout/Buttons'
import FormInput from '../../components/Layout/FormInput'
import { DayToValidate, SERVER, setWithExpiry } from '../../GlobalFunctions'


const Login = () => {

    const navigate = useNavigate();

    //------------------ Form Specific Stuff ----------------
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading,setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = async(e) => {
        e.preventDefault();

        // console.log('formdata ', formData );

        setLoading(true);
        //Basic Configurations before calling the api
        const {email,password} = formData;

        if((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) === false){
            toast.error(`${email} is not valid`);
            setFormData({...formData,email:''});
            setLoading(false);
            return;
        }


        //---------- Here we call the api to processed to login the users
        try {
            const url = `${SERVER}/user/login`;
            const options = {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(formData)
            };
            const res = await fetch(url,options);
            const data = await res.json();

            // console.log(data);

            if(data.success === true){
                toast.success(data.msg);
                navigate('/profile')
            }
            else toast.error(data.msg);

            setWithExpiry('token', data.token, DayToValidate);            

        } catch (error) { 
            toast.error(error);
            console.log(error);
            setFormData({...formData,password:''});
            setLoading(false);
            return;
        }

        setLoading(false);
        setFormData({email:'',password:''})
    }

    return (
        <>
            <section id="Login">

                <Container minH={'container.sm'} my={'5'}>

                    <Heading>Welcome to  Coursera</Heading>

                    <form onSubmit={handleSubmit} style={{ minWidth: "100%" }}>
                        <VStack>

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <FormInputPassword label={'Enter Password'} name={'password'} id='password' value={formData.password} handleChange={handleOnChange} />

                            <Link to='/forgetpassword' ><Text mt='-2.5' me={'-72'} color={'blue.300'} >Forget Password</Text> </Link>

                            <Box w='full' my='4'>
                                <Buttons loading={loading} type='submit' fontsize='lg' display={'block'} width="full" title={'Login'} />
                            </Box>

                        </VStack>
                    </form>

                    <Link to={'/register'} ><Text textAlign={'right'} textDecoration={'underline'} variant={'ghost'}>Creating A New Account</Text> </Link>

                </Container>

            </section>
        </>
    )
}

export default Login


//------------ Form controller used to store only password
export const FormInputPassword = ({ label, name,handleChange, value }) => {

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
                    id={name}
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