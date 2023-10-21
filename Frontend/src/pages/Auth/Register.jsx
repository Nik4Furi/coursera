import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Avatar, Box, Heading, VStack, Container, Text } from '@chakra-ui/react'

import toast from 'react-hot-toast'

//Icons/Images Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'

//Global Functions stuff
import { AvatarTypes, SERVER } from '../../GlobalFunctions'

//Components Stuff
import FormInput from '../../components/Layout/FormInput'
import { FormInputPassword } from './Login'
import Buttons from '../../components/Layout/Buttons'


const Register = () => {

    const navigate = useNavigate();

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        avatar: ''
    });
    const [imgPrev, setImgPrev] = useState('');
    const [loading, setLoading] = useState(false);


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle upload image
    const handleChangeImg = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            setImgPrev(reader.result)
        }

        setFormData({ ...formData, avatar: file });

        // Finding the type of the images is valid
        if (AvatarTypes.includes(file.type) === false) {
            toast.error("This type of image is not support")
            setFormData({ ...formData, avatar: '' })
            return;
        }

        // Define the size of the image
        const fileSize = file.size / 1e+6; //mb
        if (fileSize.toFixed(2) > 5) {  //Can't upload file size > 5 MB
            toast.error("Avatar must be less than 5 MB");
            setFormData({ ...formData, avatar: '' });
            return;
        }
    }

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { name, password, email, cpassword, avatar } = formData;

        if (password !== cpassword) {
            toast.error("Password and confirm password didn't match");
            setFormData({ ...formData, password: '', cpassword: '' })
            setLoading(false);
            return;
        }

        if (avatar === undefined || avatar === null) {
            toast.error("Neccessary to upload avatar")
            setFormData({ ...formData, avatar: '' });
            setLoading(false);
            return;
        }

        const myForm = new FormData();;
        myForm.append('name', formData.name);
        myForm.append('email', formData.email);
        myForm.append('password', formData.password);
        myForm.append('cpassword', formData.cpassword);
        myForm.append('file', formData.avatar);

        //-------------Now call the api to register the new user
        try {
            const url = `${SERVER}/user/register`;
            const options = {
                method: 'POST',
                body: myForm
            };

            const res = await fetch(url, options);
            const data = await res.json();

            console.log('register ', data);

            if (data.success === true) {
                toast.success(data.msg);
                navigate('/login');
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
            console.log(error)
            setFormData({ ...formData, password: '', cpassword: '' });
            setLoading(false);
            return;
        }

        setLoading(false);
        setFormData({ name: '', email: '', password: '', cpassword: '', avatar: '' });
    }
    //----------------------------Form Specific Stuff   - x 

    return (
        <>
            <section id="Register">

                <Container minH={'container.md'} my={'5'}>

                    <Heading >Become A Memeber </Heading>

                    <Avatar border={'1px solid salmon'} boxShadow={'md'} src={imgPrev} display={'block'} mx={'auto'} my={'2'} />

                    <form style={{ minWidth: '100%' }} onSubmit={handleSubmit} my='3'>
                        <VStack >

                            <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <FormInputPassword label={'Enter Password'} name={'password'} value={formData.password} handleChange={handleOnChange} />

                            <FormInputPassword label={'Confirm Pasword'} name={'cpassword'} value={formData.cpassword} handleChange={handleOnChange} />


                            <FormInput type='file' css={FileUpload} label={'Upload Your Pic'} icon={<RxAvatar />} name='avatar' handleChange={handleChangeImg} />

                            <Box w='full' my='4'>
                                <Buttons loading={loading} type={'submit'} fontsize='lg' display={'block'} width="full" title={'Register'} />
                            </Box>


                        </VStack>

                    </form>
                    <Link to={'/login'} ><Text textAlign={'right'} textDecoration={'underline'} variant={'ghost'}>Have Already A Account</Text> </Link>


                </Container>
            </section>
        </>
    )
}

export default Register;


//------------- Uploading file css
export const FileUpload = {
    "&::file-selector-button": {
        cursor: 'pointer',
        marginLeft: '-5%',
        color: 'salmon',
        border: 'none',
        height: '100%',
        background: 'transparent',
        width: '110%'
    }
}
