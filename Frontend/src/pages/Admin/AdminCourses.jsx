import React, { useEffect, useState } from 'react'


//Icons/Images Stuff
import { AiFillDelete } from 'react-icons/ai'


import {
    Box, VStack,
    Modal,
    ModalOverlay,
    ModalContent,
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
    HStack,
    Heading,
    Stack,
    ModalHeader
} from '@chakra-ui/react'

//Redux State Stuff
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, fetchLectures, handleAddNewLecture, handleDeleteCourse, handleRemoveLecture } from '../../Store/CourseSlice'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import Loading from '../../components/Layout/Loading'
import { FileUpload } from '../Auth/Register'
import FormInput from '../../components/Layout/FormInput'
import { AddTextArea } from '../ContactUS'


const AdminCourses = () => {

    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure() //modal specific stuff

    useEffect(() => {
        dispatch(fetchCourses()); //api to fetch all the courses
    }, [dispatch])

    const { courses, loading } = useSelector(state => state.course);

    const CoursesTabelHeads = ['title', 'description', 'Thumbnail', 'Category', 'Lectures'];

    const [courseId, setCourseId] = useState(null);
    const [courseTitle, setCourseTitle] = useState("");


    //---------- Function to delete the course 
    const DeleteCourse = async (id) => {
        dispatch(handleDeleteCourse(id));
    }

    //----------Function to open the modal to show lectures of the courses
    const ShowLectureForm = (id, title) => {
        dispatch(fetchLectures(id));
        onOpen();
        setCourseId(id);
        setCourseTitle(title);
    }

    //------------Function to delete the lecture
    const DeleteLecture = (lecture_id) => {
        dispatch(handleRemoveLecture(courseId, lecture_id));
    }


    return (
        <>
            <AdminLayout>

                <section id='AdminCourses'>
                    <VStack>
                        <TextHighlight size='xl' title='AdminCourses' />

                        {/* Here we show the table data of the AdminCourses  */}
                        <Box overflowX={'scroll'}>
                            <DataShowInTable data={courses} ShowLectureForm={ShowLectureForm} loading={loading} handleDeleteCourse={DeleteCourse} tablesHeads={CoursesTabelHeads} DeleteLecture={DeleteLecture} isOpen={isOpen} onClose={onClose} courseId={courseId} courseTitle={courseTitle} />
                        </Box>

                    </VStack>
                </section>


            </AdminLayout>
        </>
    )
}

export default AdminCourses;


export const DataShowInTable = ({ tablesHeads, data, handleDeleteCourse, loading, ShowLectureForm, isOpen, onClose, DeleteLecture, courseId, courseTitle }) => {

    return (
        <>
            {loading && <Loading />}
            <AddShowLectureModal onClose={onClose} id={courseId} isOpen={isOpen} DeleteLecture={DeleteLecture} courseTitle={courseTitle} />

            <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha.200'>
                    <TableCaption>All availables courses here</TableCaption>
                    <Thead textAlign={'center'}>
                        <Tr>
                            <Th>S.No.</Th>
                            {tablesHeads.map((item, i) => (

                                <Th key={i}>{item}</Th>
                            ))}
                            <Th textAlign={'right'} >Action</Th>
                            {/* <Th isNumeric>multiply by</Th> */}
                        </Tr>
                    </Thead>

                    <Tbody>{
                        data?.map((item, i) => (
                            <Tr key={i}>

                                <Td>{i + 1}</Td>
                                <Td>{item?.title}</Td>
                                <Td><Text noOfLines={2}> {item?.description}</Text></Td>
                                <Td><Image src={item?.poster?.url} /></Td>
                                <Td >{item?.category}</Td>
                                <Td isNumeric>{item?.totalVideos}</Td>
                                <Td>
                                    <HStack>

                                        <Button onClick={() => ShowLectureForm(item._id, item?.title)}  >Watch Lectures</Button>
                                        {loading ? <Loading /> :
                                            <AiFillDelete cursor={'pointer'} onClick={() => handleDeleteCourse(item._id)} />}
                                    </HStack>
                                </Td>
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
const AddShowLectureModal = ({ isOpen, onClose, DeleteLecture, id, courseTitle }) => {

    const { lectures } = useSelector(state => state.course);

    return (
        <>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW='90vw' minH='100vh'>
                    <ModalHeader textTransform='capitalize' textAlign={'center'} color={'salmon'}>{courseTitle}</ModalHeader>
                    <ModalCloseButton onClick={onClose} />

                    <ModalBody padding={['3', '12']}>

                        <Grid templateColumns={['1fr', '2fr 3fr']}  >

                            {/* Here we show the form to adding a new lecture */}
                            <Box mx='3' my='3'>
                                <AddLectureForm id={id} />
                            </Box>

                            {/* Here we show the lectures with in form of table and preview the video data  */}
                            <VStack w={'full'}>
                                <Heading>Lectures 🗨️</Heading>
                                {!lectures && <Text>No lectures in this course</Text>}
                                {lectures?.map((item, i) => (
                                    <Box key={i} p='2' minW={'50vw'} my='2' mx='2' border={'1px solid purple'} boxShadow={'dark-lg'}>
                                        <Stack direction={['column', 'row']} justifyContent={['center', 'space-between']} spacing={'2'} >
                                            <Box>
                                                <Heading textTransform={'capitalize'} size='lg' > #{i + 1}{ } {item?.title} </Heading>
                                                <Text>Views : <strong>{item?.views}</strong></Text>
                                                <Text><strong>Description: </strong>{item?.description}</Text>
                                            </Box>
                                            <Button >
                                                <AiFillDelete style={{ minWidth: '100px' }} onClick={() => DeleteLecture(item._id)} /></Button>
                                        </Stack>
                                    </Box>
                                ))}


                            </VStack>
                        </Grid>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

//------------------ Adding a new lecture using a form
export const AddLectureForm = ({ id }) => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.course);

    //------------------ Form Specific Stuff ----------------    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: ''
    });
    const [videoPrev, setVideoPrev] = useState();

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Function to handle upload image
    const handleUploadVideo = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => setVideoPrev(reader.result);

        setFormData({ ...formData, video: file });
    }

    //------------- Function to handle to add new lecture
    const AddNewLecture = async (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.append('title', formData.title)
        myForm.append('description', formData.description)
        myForm.append('file', formData.video)

        dispatch(handleAddNewLecture(id, myForm));

        setFormData({ title: '', description: '', video: '' });
        setVideoPrev('');
    }


    return (
        <form onSubmit={AddNewLecture}>

            <FormInput type={'text'} label={'Enter Lecture Title'} name='title' value={formData.title} handleChange={handleOnChange} minlen={5} maxlen={80} />

            <AddTextArea label={'Enter Lectuer Description'} name='description' value={formData.description} handleChange={handleOnChange} placeholder={'Enter lecture description here'} />

            <FormInput type={'file'} css={FileUpload} label={'Adding a lecture video'} name='video' handleChange={handleUploadVideo} />

            {videoPrev && <video src={videoPrev} controls controlsList='noDonwload ' ></video>}

            <Box w='full' my='2' p='2' display={'block'} mx='auto'>
                <Buttons width={'full'} title='Add New Lecture' type='submit' loading={loading} />

            </Box>

        </form>
    )
}