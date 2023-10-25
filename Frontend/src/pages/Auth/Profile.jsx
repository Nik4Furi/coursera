import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import {
    Avatar, Box, Button, HStack, Stack, VStack, Heading, Text, Container, Grid, Image, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import toast from 'react-hot-toast';

//Global Function Stuff
import { AvatarTypes, SERVER, Token } from '../../GlobalFunctions';

//------------Redux store specific stuff
import { useDispatch, useSelector } from 'react-redux';
import { handleCancelSubscription, handleCourseRemoveToPlaylist, handleFetchUserCoursePlaylist, updateProfilePicture } from '../../Store/UsersSlice';

//Icons/Images Specific Stuff
import { AiTwotoneDelete } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'

//Components Stuff
import Buttons from '../../components/Layout/Buttons';
import { FileUpload } from './Register';
import FormInput from '../../components/Layout/FormInput';
import Loading from '../../components/Layout/Loading';


const Profile = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const { playlist, loading, user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(handleFetchUserCoursePlaylist());
    }, [dispatch]);


    const CancelSubscription = () => {
        dispatch(handleCancelSubscription());
    }

    return (
        <>
            {!user && <Loading />}
            {/* When click on upload pictur, then trigger this file  */}
            <UploadPictureModal onClose={onClose} isOpen={isOpen} />

            <section id="Profile">

                <Heading textAlign={'center'} my='2'>Profile</Heading>

                <Stack p={'5'} direction={['column', 'row']} spacing={'5'} justifyContent={'center'} alignItems={'center'}>

                    <VStack justifyContent={'center'} align={'center'}>
                        <Avatar size={'2xl'} src={user?.avatar?.url} boxShadow={'xl'} border={'1px dotted salmon'} />

                        <Buttons handleClick={onOpen} title='Update Picture' color={'gray'} variant={'body'} />
                    </VStack>

                    <VStack>
                        <Text textTransform={'capitalize'} ><strong>Name: </strong>{user?.name}</Text>
                        <Text><strong>Email: </strong>{user?.email}</Text>

                        <Text><strong>Subscription: </strong>{user?.subscription?.status === 'active' ? <Buttons loading={loading} handleClick={CancelSubscription} display={'inline'} variant={'ghost'} color='red' title={'Cancel Subscription'} /> : <Link to='/subscribe'> <Buttons color={'salmon'} variant={'outline'} colorscheme='salmon' display={'inline'} title={'Subscribe'} /></Link>}</Text>

                        <HStack my='3'>
                            <Link to='/updateprofile'>  <Buttons title='Update Profile' /> </Link>
                            <Link to='/changepassword'>  <Buttons title='Change Password' /> </Link>
                        </HStack>

                    </VStack>


                </Stack>

                {/* Playlist section to show the playlist added courses  */}
                <section>
                    <Container mx='auto' mt='10' minH={'container-sm'}>
                        <Heading size='lg'>Playlist</Heading>

                        <Grid templateColumns={['1fr', 'repeat(2,2fr)']} my='2' p='2'>
                            {(!playlist || playlist?.length === 0) && <Text>No course is available in your playlist</Text>}

                            {playlist && playlist?.map((item, index) => (
                                <PlaylistCard key={index} id={item._id} img={item?.poster?.url} title={item?.title} />
                            ))}

                        </Grid>
                    </Container>
                </section>

            </section>
        </>
    )
}

export default Profile


//-------------- Playlist Card
export const PlaylistCard = ({ img, title, id, description }) => {

    const dispatch = useDispatch();

    //-------------- Function to remove the course from playlist
    const handleDeleteCourse = async () => {
        dispatch(handleCourseRemoveToPlaylist(id));
    }


    return (
        <Box boxShadow={'dark-lg'} my={'2'} mx='2' >
            <Image src={img} alt={title} w='full' />

            <HStack p='3' my='3' justifyContent={'space-between'} alignItems={'center'}>

                <Heading size='md' textTransform={'capitalize'}  >{title}</Heading>

                <Heading size='md' textTransform={'capitalize'}  >{description}</Heading>

                <Box><AiTwotoneDelete cursor={'pointer'} onClick={handleDeleteCourse} /> </Box>
            </HStack>
        </Box>
    )
}

//------------ Modal to change or upload new profile picture 
export const UploadPictureModal = ({ isOpen, onClose }) => {

    const [imgPrev, setImgPrev] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    //Function to handle upload image
    const handleImgChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => setImgPrev(reader.result)

        setFile(file);

        // Finding the type of the images is valid
        if (AvatarTypes.includes(file.type) === false) {
            toast.error("This type of image is not support")
            setFile('');
            return;
        }


        // Define the size of the image
        const fileSize = file.size / 1e+6; //mb
        if (fileSize.toFixed(2) > 5) {   //Can't upload file size > 5 MB
            toast.error("Avatar must be less than 5 MB");
            setFile('');
            return;
        }
    }

    //------------ Function to upload the imag
    const handleUploadImg = async () => {
        setLoading(true);

        if (!file) {
            toast.error('File not found');
            setFile('');
            setLoading(false);
            return;
        }

        const myForm = new FormData();
        myForm.append('file', file);

        //------------Nwo call the api to upload a avatar
        try {
            const url = `${SERVER}/user/updatePicture`;
            const options = {
                method: 'PUT',
                headers: {
                    'auth-token': Token
                },
                body: myForm
            };

            const res = await fetch(url, options);
            const data = await res.json();

            if (data.success === true) {

                toast.success(data.msg);

                dispatch(updateProfilePicture(data.user.avatar.url));
            }
            else toast.error(data.msg);

        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
        handleClose();
    }

    //----------- Function to close the modal
    const handleClose = () => {
        setFile('');
        setImgPrev('');

        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload a profile picture</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <VStack>
                        <Avatar border={'1px solid salmon'} boxShadow={'md'} src={imgPrev} display={'block'} mx={'auto'} my={'2'} />

                        <FormInput icon={<RxAvatar />} type='file' css={FileUpload} name='avatar' handleChange={handleImgChange} />
                    </VStack>
                </ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Buttons loading={loading} title={'Upload Picture'} handleClick={handleUploadImg} />
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                        Cancel
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}