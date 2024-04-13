import React, { useState } from 'react'

import { Link,useNavigate} from 'react-router-dom'

import {
    Container, VStack, FormControl,
    FormLabel,
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

//------------- Store Specific Stuff
import { useDispatch, useSelector } from 'react-redux'
import { getUser, handleLoginUser } from '../../store/UsersSlice'

//Icons/Images Specific Stuff
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'


//Components Stuff
import Buttons from '../../components/Layout/Buttons'
import FormInput from '../../components/Layout/FormInput'
import TextHighlight from '../../components/Layout/TextHighlight'


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    //------------------ Store specific stuff
    const { loading } = useSelector(state => state.user);

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = async (e) => {

        e.preventDefault()

        if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email)) === false) {
            toast.error(`${formData.email} is not valid`);
            setFormData({ ...formData, email: '' });
            return;
        }

        await dispatch(handleLoginUser(formData));

        navigate(0)

        dispatch(getUser);

        

        setFormData({ email: '', password: '' });
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

                            <Link to='/forgetpassword' ><Text mt='-3.5' me={'-72'}  ><TextHighlight title={'Forget Password'} size='sm' /> </Text> </Link>

                            <Box w='full' my='4' display={'block'} mx='auto'>
                                <Buttons loading={loading} type='submit' fontsize='lg' width="full" title={'Login'} />
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
export const FormInputPassword = ({ label, name, handleChange, value, outline = 'salmon', border = '0.5px solid' }) => {

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
                    outline={outline}
                    border={border}
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