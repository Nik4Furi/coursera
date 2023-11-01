import React, { useState } from 'react'

<<<<<<< HEAD
import { Link} from 'react-router-dom'
=======
import {Link} from 'react-router-dom'
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

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
<<<<<<< HEAD
import TextHighlight from '../../components/Layout/TextHighlight'
import { Token } from '../../GlobalFunctions'
=======
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d


const Login = () => {

<<<<<<< HEAD
    const dispatch = useDispatch()

    //------------------ Store specific stuff
    const { loading } = useSelector(state => state.user);

=======
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
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

<<<<<<< HEAD
        e.preventDefault()

        if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email)) === false) {
            toast.error(`${formData.email} is not valid`);
            setFormData({ ...formData, email: '' });
            return;
        }

       await dispatch(handleLoginUser(formData));

        if(Token)
            dispatch(getUser);

        setFormData({ email: '', password: '' });
=======
        console.log('formdata ', formData);
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
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

<<<<<<< HEAD
                            <Link to='/forgetpassword' ><Text mt='-3.5' me={'-72'}  ><TextHighlight title={'Forget Password'} size='sm' /> </Text> </Link>

                            <Box w='full' my='4' display={'block'} mx='auto'>
                                <Buttons loading={loading} type='submit' fontsize='lg' width="full" title={'Login'} />
=======
                            <Box w='full' my='4'>
                                <Buttons handleClick={handleSubmit} fontsize='lg' display={'block'} width="full" title={'Login'} />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
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