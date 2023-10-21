import React, { useEffect, useLayoutEffect, useState } from 'react'


//Icons/Images Stuff
import { AiFillDelete } from 'react-icons/ai'


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
    Grid,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Image,
    HStack
} from '@chakra-ui/react'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import { FileUpload } from '../Auth/Register'
import FormInput from '../../components/Layout/FormInput'
import { AddTextArea } from '../ContactUS'
import { SERVER, Token } from '../../GlobalFunctions'
import toast from 'react-hot-toast'
import { setCourses, setLectures, setLoading } from '../../store/AdminSlice'
import { useDispatch } from 'react-redux'
import { removeCourse } from '../../store/CourseSlice'


const AdminCourses = () => {

    const dispatch = useDispatch();

    const CoursesTabelHeads = ['title', 'description', 'Thumbnail', 'Category', 'Views', 'Lectures'];
    const [course, setCourse] = useState([]);

    //----------------------- Function to fetch the courses from the api
    const FetchCourses = async () => {
        try {
            const url = `${SERVER}/course/fetchcourses`;

            const res = await fetch(url);
            const data = await res.json();

            console.log('fetch courses ', data);

            if (data.success === true) {
                toast.success(data.msg);
                setCourse(data.courses);

                dispatch(setCourses(data.courses));
            }
            else toast.error(data.msg);




        } catch (error) {
            toast.error(error.response.data.messsage);
            console.log(error.response.data.messsage);
        }
    }

    useEffect(() => {
        FetchCourses(); //fetching all courses

        // console.log('data is ', course);
    }, []);




    return (
        <>
            <AdminLayout>

                <section id='AdminCourses'>
                    <VStack>
                        <TextHighlight size='xl' title='AdminCourses' />

                        {/* Here we show the table data of the AdminCourses  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable data={course} tablesHeads={CoursesTabelHeads} />
                        </Box>

                    </VStack>
                </section>


            </AdminLayout>
        </>
    )
}

export default AdminCourses;


export const DataShowInTable = ({ tablesHeads, data}) => {

    const { isOpen, onOpen, onClose } = useDisclosure() //modal specific stuff

    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState(data || []);

    const dispatch = useDispatch();

    useLayoutEffect(()=> setFilterData(data),[]);

    //---------- Function to delete the course 
    const handleDeleteCourse = async (id) => {

        console.log('find course ', id);
        setLoading(true);

        try {
            const url = `${SERVER}/admin/removeCourse/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    "auth-token": Token
                }
            };

            const res = await fetch(url, options);
            const data = await res.json();

            console.log('delete course ', data);

            if (data.success === true) {

                toast.success(data.msg);

                dispatch(removeCourse(id));

                setFilterData(filterData.filter(item => item._id !== id));
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error.response.data.messsage);
            console.log(error.response.data.messsage);
        }
        setLoading(false);
    }


    console.log('data at the courses ', data);

    return (
        <>
            <AddShowLectureModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />


            <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha.200'>
                    <TableCaption>All availables courses here</TableCaption>
                    <Thead textAlign={'center'}>
                        <Tr>
                            <Th>S.No.</Th>
                            {tablesHeads.map((item, i) => (

                                <Th key={i}>{item}</Th>
                            ))}
                            <Th>Action</Th>
                            {/* <Th isNumeric>multiply by</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>{
                        filterData?.map((item, i) => (
                            <Tr key={i}>

                                <Td>{i + 1}</Td>
                                <Td>{item?.title}</Td>
                                <Td><Text noOfLines={2}> {item?.description}</Text></Td>
                                <Td><Image src={item?.poster?.url} /></Td>
                                <Td >{item?.category}</Td>
                                <Td isNumeric>{item?.views}</Td>
                                <Td isNumeric>{item?.totalVideos}</Td>
                                <Td>
                                    <HStack>

                                        <Button onClick={onOpen} >Watch Lectures</Button>   <AiFillDelete cursor={'pointer'} onClick={() =>handleDeleteCourse(item._id)} /> </HStack>  </Td>
                            </Tr>
                        ))
                    }


                    </Tbody>

                </Table>
            </TableContainer>

        </>
    )
}


//----------- Showing the modal at the top to view the lecture preview and add new lecture in prefered course 
const AddShowLectureModal = ({ onOpen, isOpen, onClose }) => {

    return (
        <>


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

    const [loading, setLoading] = useState(false);
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

        reader.readAsDataURL(file);

        setFormData({ ...formData, video: file });
    }

    //------------- Function to handle to add new lecture
    const handleAddNewLecture = async (e, id) => {
        console.log('course id ', id);
        e.preventDefault();

        setLoading(true);

        console.log('adding a new lecture ', formData);

        const myForm = new FormData();

        myForm.append('title', formData.title)
        myForm.append('description', formData.description)
        myForm.append('file', formData.video)

        try {
            const url = `${SERVER}/admin/addLecture?course_id=${id}`;
            const options = {
                method: 'POST',
                headers: {
                    "auth-token": Token
                },
                body: myForm
            };

            const res = await fetch(url, options);
            const data = await res.json();

            console.log('add lecture ', data);

            if (data.success === true) {
                toast.success(data.msg);
                // dispatch(setLectures(data.lectures))
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error.response.data.messsage)
            console.error(error.response.data.messsage)
        }

        setLoading(false);


    }


    return (
        <form onSubmit={handleAddNewLecture}>

            <FormInput type={'text'} label={'Enter Lecture Title'} name='title' value={formData.title} handleChange={handleOnChange} minlen={5} maxlen={80} />

            <AddTextArea label={'Enter Lectuer Description'} name='msg' value={formData.description} handleChange={handleOnChange} placeholder={'Enter course description here'} />

            <FormInput type={'file'} css={FileUpload} label={'Adding a lecture video'} name='video' handleChange={handleUploadVideo} />

            <Box w='full' my='2' p='2' display={'block'} mx='auto'>
                <Buttons width={'full'} title='Add New Lecture' type='submit' loading={loading} />

            </Box>

        </form>
    )
}

//------------------- Showing the lecture videos preview
// export const PreviewLectures = ()=>{
//     return (

//     )
// }