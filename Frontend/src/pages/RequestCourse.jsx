import React,{useState} from 'react'

import { Box, Container, FormControl, FormLabel, Heading, Select, VStack } from '@chakra-ui/react'

//Icons/Images Specific Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

//Global Function Stuff
import { CoursesCategories } from '../GlobalFunctions';

//Components Specific Stuff
import FormInput from '../components/Layout/FormInput';

import Buttons from '../components/Layout/Buttons';

const RequestCourse = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        course:''
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
            <section id="RequestCourse">
                <Container minH={'container.sm'} >

                    <Heading >Request For A Course 📩</Heading>

                    <form>
                        <VStack>
                            <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' id='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <FormControl>
                                <FormLabel>Course</FormLabel>
                                <Select name='course' placeholder='Select Course'>
                                    {CoursesCategories.map((course, index) => (
                                        <option name='course' id='course' key={index} >{course}</option>)
                                    )}

                                </Select>
                            </FormControl>

                            <Box w='full' cursor={'pointer'} p='2' my='4'>
                                <Buttons handleClick={handleSubmit} fontsize='lg' display={'block'} mx='auto' width="full" title={'Request For Course'} />
                            </Box>

                        </VStack>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default RequestCourse