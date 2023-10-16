import React, { useState } from 'react'

import { FormControl, FormLabel, Select, Heading, Avatar, Textarea, Box, Image } from '@chakra-ui/react';

//Admin Layout Stuff
import AdminLayout from '../../components/Admin/AdminLayout'

//Global Functions
import { CoursesCategories } from '../../GlobalFunctions';

//Component Stuff
import FormInput from '../../components/Layout/FormInput'
import { FileUpload } from '../Auth/Register';
import { AddTextArea } from '../ContactUS';
import Buttons from '../../components/Layout/Buttons';

const CreateCourse = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: '',
        category: ''
    });
    const [imgPrev, setImgPrev] = useState('');

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle upload image
    const handleUploadVideo = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        // console.log('reader', reader);

        reader.readAsDataURL(file);

        reader.onload = () => {
            setImgPrev(reader.result)
        }

        // console.log(file);

        setFormData({ ...formData, img: file });

        // // Finding the type of the images is valid
        // if (AvatarTypes.includes(file.type) === false) {
        //     toast.error("This type of image is not support")
        //     setFormData({ ...formData, avatar: '' })
        //     return;
        // }


        // Define the size of the image
        // const fileSize = file.size / 1e+6; //mb
        // if (fileSize.toFixed(2) > 5) {
        //     //Can't upload file size > 5 MB
        //     toast.error("Avatar must be less than 5 MB");
        //     setFormData({ ...formData, avatar: '' });
        //     return;
        // }
    }


    //Function to submit the data or can say add the course
    const handleSubmit = ()=>{
        console.log('submit the data ');
        console.log('formdata ',formData);
    }

    return (
        <>
            <AdminLayout >
                <section id="CreateCourses">

                    <Box p='3'>
                        <Heading >Create a New Course, Now!</Heading>

                        <form  onSubmit={handleSubmit}>


                            <FormInput type={'text'} label={'Enter Title'} name='title' id='title' value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <AddTextArea label={'Enter Course Description'} name='description' value={formData.description} handleChange={handleOnChange} placeholder={'Enter course description here'} />


                            <FormControl>
                                <FormLabel>Course</FormLabel>
                                <Select textTransform={'capitalize'} name='course' placeholder='Select Course'>
                                    {CoursesCategories.map((course, index) => (
                                        <option name='course' id='course' key={index} >{course}</option>)
                                    )}

                                </Select>
                            </FormControl>

                            <FormInput type='file' css={FileUpload} label={'Upload Course Pic'} name='img' id='img' handleChange={handleUploadVideo} />

                            {imgPrev &&
                                <Box width={'400px'} height={'200px'} display={'block'} mx={'auto'} my={'2'} boxShadow={'md'} >

                                    <Image src={imgPrev} boxSize={'fit-content'} />
                                </Box>}

<Box display={'block'} mx='auto' my='5' width={'3xl'} p='3'>
                        <Buttons  width={'full'}  title={'Add Course'} handleClick={handleSubmit} />
                        </Box>

                        </form>

                    </Box>
                </section>

            </AdminLayout>
        </>
    )
}

export default CreateCourse
