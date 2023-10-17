import React,{useState} from 'react'

import {
    Box, VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Grid
} from '@chakra-ui/react'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import { DataShowInTable } from './Users'
import { FileUpload } from '../Auth/Register'
import FormInput from '../../components/Layout/FormInput'
import { AddTextArea } from '../ContactUS'


const AdminCourses = () => {
    const CoursesTabelHeads = ['title','description','Thumbnail','Category','Views','Lectures']
    return (
        <>
            <AdminLayout>

                <section id='AdminCourses'>
                    <VStack>
                        <TextHighlight size='xl' title='AdminCourses' />

                        {/* Here we show the table data of the AdminCourses  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable tablesHeads={CoursesTabelHeads} />
                        </Box>

                    </VStack>
                </section>

                <AddShowLectureModal />

            </AdminLayout>
        </>
    )
}

export default AdminCourses;


//----------- Showing the modal at the top to view the lecture preview and add new lecture in prefered course 
const AddShowLectureModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW='90vw' minH='100vh'>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>

                        <Grid templateColumns={['1fr', '3fr 6fr']}>

                            {/* Here we show the form to adding a new lecture */}
                            <Box>
                                    <AddLectureForm />
                            </Box>

                            {/* Here we show the lectures with in form of table and preview the video data  */}
                            <Box p='3'>
Here we show the prview of the lectues 
                            </Box>

                        </Grid>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

//------------------ Adding a new lecture using a form
export const AddLectureForm = () => {

    //------------------ Form Specific Stuff ----------------    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: ''
    });
    


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle upload image
    const handleUploadVideo = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        // console.log('reader', reader);

        reader.readAsDataURL(file);

        // reader.onload = () => {
        //     // setImgPrev(reader.result)
        // }

        console.log(file);

        setFormData({ ...formData, video: file });
    }

    //------------- Function to handle to add new lecture
    const handleAddNewLecture = ()=>{
        console.log('adding a new lecture');
    }


    return (
        <form >

            <FormInput type={'text'} label={'Enter Lecture Title'} name='title' value={formData.title} handleChange={handleOnChange} minlen={5} maxlen={80} />

            <AddTextArea label={'Enter Lectuer Description'} name='msg' value={formData.description} handleChange={handleOnChange} placeholder={'Enter course description here'} />

            <FormInput type={'file'} css={FileUpload} label={'Adding a lecture video'} name='video' handleChange={handleUploadVideo} />

            <Box w='full' my='2' p='2' display={'block'} mx='auto'>
                <Buttons width={'full'} title='Add New Lecture' handleClick={handleAddNewLecture} />

            </Box>

        </form>
    )
}

//------------------- Showing the lecture videos preview
// export const PreviewLectures = ()=>{
//     return (

//     )
// }