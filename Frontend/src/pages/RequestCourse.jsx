import React, { useState } from 'react'

import { Box, Container, FormControl, FormLabel, Heading, Select, VStack } from '@chakra-ui/react'

import toast from 'react-hot-toast';

//Icons/Images Specific Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

//Global Function Stuff
import { CoursesCategories, SERVER } from '../GlobalFunctions';

//Components Specific Stuff
import FormInput from '../components/Layout/FormInput';
import Buttons from '../components/Layout/Buttons';

const RequestCourse = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { name, email, course } = formData;

        //---------- Validation the email
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email) === false) {
            toast.error(`${email} is not valid`)
            setFormData({ ...formData, email: '' });
            setLoading(false);
            return;
        }

        const msg = `Please start to teach the ${course}.It will help us to learn new technology`;

        //----------- Call the api to send the mail for course request
        try {

            const url = `${SERVER}/contact`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, msg })
            };

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true)
                toast.success(data.msg);
            else
                toast.error(data.msg);

        } catch (error) {
            toast.error(error);
        }

        setLoading(false);
        setFormData({ name: '', email: '', course: '' });
    }


    return (
        <>
            <section id="RequestCourse">
                <Container minH={'container.sm'} >

                    <Heading >Request For A Course 📩</Heading>

                    <form onSubmit={handleSubmit}>
                        <VStack>
                            <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <FormControl>
                                <FormLabel>Course</FormLabel>
                                <Select outline={'salmon'} border={'0.5px solid'} name='course' id='course' onChange={handleOnChange} value={formData.course} placeholder='Select Course'>
                                    {CoursesCategories.map((course, index) => (
                                        <option name='course' id='course' key={index} value={course} >{course}</option>)
                                    )}

                                </Select>
                            </FormControl>

                            <Box w='full' cursor={'pointer'} p='2' my='4'>
                                <Buttons loading={loading} type='submit' fontsize='lg' display={'block'} mx='auto' width="full" title={'Request For Course'} />
                            </Box>

                        </VStack>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default RequestCourse