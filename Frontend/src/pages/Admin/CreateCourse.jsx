import React, { useState } from 'react'

import { FormControl, FormLabel, Select, Heading, Avatar, Textarea, Box, Image } from '@chakra-ui/react';

import toast from 'react-hot-toast'

//Admin Layout Stuff
import AdminLayout from '../../components/Admin/AdminLayout'

//Global Functions
import { CoursesCategories,AvatarTypes, SERVER, Token } from '../../GlobalFunctions';

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
    const [loading, setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle upload image
    const handleUploadImg = (e) => {
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
        if (AvatarTypes.includes(file.type) === false) {
            toast.error("This type of image is not support")
            setFormData({ ...formData, avatar: '' })
            return;
        }


        // Define the size of the image
        const fileSize = file.size / 1e+6; //mb
        if (fileSize.toFixed(2) > 5) {
            //Can't upload file size > 5 MB
            toast.error("Avatar must be less than 5 MB");
            setFormData({ ...formData, avatar: '' });
            return;
        }
    }


    //Function to submit the data or can say add the course
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        console.log('formdata ', formData);

        const myForm = new FormData();
        myForm.append('title',formData.title);
        myForm.append('description',formData.description);
        myForm.append('category',formData.category);
        myForm.append('file',formData.img);


        try {
            const url = `${SERVER}/course/addCourse`;
            const options = {
                method : 'POST',
                headers : {
                    "auth-token" : Token
                },
                body : myForm
            };

            const res = await fetch(url,options);
            const data = await res.json();

            console.log('add course',data);

            if(data.success === true)
                toast.success(data.msg);
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
            console.log(error);
        }
        setLoading(false);
        // setFormData({title:'',description:'',category:'',img:''})
    }

    return (
        <>
            <AdminLayout >
                <section id="CreateCourses">

                    <Box p='3'>
                        <Heading >Create a New Course, Now!</Heading>

                        <form onSubmit={handleSubmit}>


                            <FormInput type={'text'} label={'Enter Title'} name='title' value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <AddTextArea label={'Enter Course Description'} name='description' minlen={12} maxlen={200} value={formData.description} handleChange={handleOnChange} placeholder={'Enter course description here'} />


                            <FormControl>
                                <FormLabel>Course</FormLabel>
                                <Select textTransform={'capitalize'} name='category'
                                id='category'
                                onChange={handleOnChange}
                                value={formData.category} 
                                placeholder='Select Course'>
                                    {CoursesCategories.map((course, index) => (
                                        <option name='category' id='category' key={index} >{course}</option>)
                                    )}

                                </Select>
                            </FormControl>

                            <FormInput type='file' css={FileUpload} label={'Upload Course Pic'} name='img' handleChange={handleUploadImg} />

                            {imgPrev &&
                                <Box width={'400px'} height={'200px'} display={'block'} mx={'auto'} my={'2'} boxShadow={'md'} >

                                    <Image src={imgPrev} boxSize={'fit-content'} />
                                </Box>}

                            <Box display={'block'} mx='auto' my='5' width={'3xl'} p='3'>
                                <Buttons width={'full'} title={'Add Course'} type='submit' loading={loading} />
                            </Box>

                        </form>

                    </Box>
                </section>

            </AdminLayout>
        </>
    )
}

export default CreateCourse
