import React, { useState } from 'react'

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

//Icons/Images Specific Stuff
import { AiTwotoneDelete } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import demo from '../../assets/images/header.jpg'

//Components Stuff
import Buttons from '../../components/Layout/Buttons';
import { FileUpload } from './Register';
import toast from 'react-hot-toast';
import { AvatarTypes } from '../../GlobalFunctions';
import FormInput from '../../components/Layout/FormInput';
import { Link } from 'react-router-dom'


const Profile = () => {

    const [subscribe, setSubscribe] = useState(true);

    //-------------- Function to remove the course from playlist

    //------------------- Modal stuff will help use to change the avatar -----------X

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
                {/* When click on upload pictur, then trigger this file  */}
                <UploadPictureModal onClose={onClose} isOpen={isOpen} />

            <section id="Profile">
                <Heading textAlign={'center'} my='2'>Profile</Heading>
                <Stack direction={['column', 'row']} spacing={'5'} justifyContent={'center'} alignItems={'center'}>

                    <VStack justifyContent={'center'} align={'center'}>
                        <Avatar src='' minH={'30vh'} minW={'15vw'} />

                        <Buttons handleClick={onOpen} title='Update Picture' color={'gray'} variant={'body'} />
                    </VStack>

                    <VStack>
                        <Text><strong>Name: </strong>Nikhil</Text>
                        <Text><strong>Email: </strong>nikhil23@gmail.com</Text>
                        <Text><strong>Subscription: </strong>{subscribe ? <Buttons display={'inline'} variant={'ghost'} color='red' title={'Cancel Subscription'} /> : <Buttons colorscheme={'purple.200'} variant={'unstyled'} display={'inline'} title={'Subscribe'} />}</Text>

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

                        <Grid templateColumns={['1fr', 'repeat(2,1fr)']} my='2' p='2'>
                            <PlaylistCard img={demo} title='this is course' />
                            <PlaylistCard />
                            <PlaylistCard />
                        </Grid>
                    </Container>
                </section>

            </section>
        </>
    )
}

export default Profile


//-------------- Playlist Card
export const PlaylistCard = ({ img, title }) => {
    return (
        <Box boxShadow={'dark-lg'} my={'2'} mx='2' >
            <Image src={img} alt={title} />
            <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Heading size='md' textTransform={'capitalize'}  >{title}</Heading>

                <Box><AiTwotoneDelete /> </Box>
            </HStack>
        </Box>
    )
}

//------------ Modal to change or upload new profile picture 
export const UploadPictureModal = ({ isOpen, onClose }) => {

    const [imgPrev, setImgPrev] = useState('');
    const [file, setFile] = useState('');

    //Function to handle upload image
    const handleImgChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        // console.log('reader', reader);

        reader.readAsDataURL(file);

        reader.onload = () => {
            setImgPrev(reader.result)
        }

        // console.log(file);

        setFile(file);

        // Finding the type of the images is valid
        if (AvatarTypes.includes(file.type) === false) {
            toast.error("This type of image is not support")
            setFile('');
            return;
        }


        // Define the size of the image
        const fileSize = file.size / 1e+6; //mb
        if (fileSize.toFixed(2) > 5) {
            //Can't upload file size > 5 MB
            toast.error("Avatar must be less than 5 MB");
            setFile('');
            return;
        }
        // handleClose();
    }

    //------------ Function to upload the imag
    const handleUploadImg = ()=>{
            handleClose();
    }

    //----------- Function to close the modal
    const handleClose = ()=>{
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

                        <FormInput icon={<RxAvatar />} type='file' css={FileUpload} name='avatar' id='avatar' handleChange={handleImgChange} />
                    </VStack>
                </ModalBody>

<<<<<<< HEAD
                <ModalFooter display={'flex'} justifyContent={'space-between'}>

                    <Box w={'full'} p='2' my='4' display={'block'} mx='auto'>
                        <Buttons loading={loading} title={'Upload Picture'} handleClick={handleUploadImg} />
                    </Box>

=======
                <ModalFooter>
                    <Buttons title={'Upload Picture'}  handleClick={handleUploadImg}/>
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                        Cancel
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}