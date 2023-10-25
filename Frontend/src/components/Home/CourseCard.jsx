import React from 'react';

import {Link, useNavigate} from 'react-router-dom'

import toast from 'react-hot-toast'

import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
  Button,
} from '@chakra-ui/react'

//-------------Store Specific Stuff
import { handleAddToPlaylist } from '../../Store/UsersSlice';
import { useDispatch, useSelector } from 'react-redux';

//Global Functions Stuff
import { Token } from '../../GlobalFunctions';

//Components
import Buttons from '../../components/Layout/Buttons'

export default function CourseCard({ img, title, description, category, lectureCount, id }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {loading} = useSelector(state=>state.course);

  //----------- Function to add course into playlist
  const handleAddCourse = async () => {

    if(!Token){
      toast.error('Before adding course in playlist, please login')
      navigate('/login');
      return;
    }

    dispatch(handleAddToPlaylist(id));
  }

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'md'}
        my={5}
        mx={[0, 5]}
        bg="white"
        boxShadow={'dark-lg'} >

        <Box borderBottom={'1px'} borderColor="black">
          <Img
            src={img}
            roundedTop={'sm'}
            objectFit="fit"
            w="full"
            h='fit-content'
            alt={title}
          />
        </Box>

        <Box p={4}>
          <Box bg="black" display={'inline-block'} px={2} py={1} color="white" mb={2}>
            <Text textTransform={'capitalize'} fontSize={'xs'} fontWeight="medium">
              {category}
            </Text>
          </Box>
          <Heading color={'black'} textTransform={'capitalize'} fontSize={'2xl'} noOfLines={1}>
            {title}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {description}
          </Text>

          <Text fontSize={'md'} fontWeight={'semibold'}>
              LectureCount: <strong>{lectureCount}</strong>
            </Text>

        </Box>

        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">

          <Link to={`/course/lecture/${id}`} >  <Button backdropBlur={'sm'} colorScheme='red.500' background={'red.200'} boxShadow={'md'} >Watch Now</Button></Link>
            <Buttons title={'Add To Playlist'} loading={loading} handleClick={handleAddCourse} />
          </Flex>

     
        </HStack>
      </Box>
    </Center>
  )
}