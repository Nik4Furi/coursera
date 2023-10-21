import React, { useState } from 'react';

import {Link, useNavigate} from 'react-router-dom'

import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'

import toast from 'react-hot-toast'


//Icons/Image Stuff
import demo from '../../assets/images/header-2.png'

//Components
import Buttons from '../../components/Layout/Buttons'
import { SERVER, Token } from '../../GlobalFunctions';
import { setLectures,addLecture } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';

export default function CourseCard({ img, title, description, category, lectureCount, views,id }) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //----------- Function to add course into playlist
  const handleAddToPlaylist = async () => {

    console.log('id is ',id)

    if(!Token){
      toast.error('Please login first')
      navigate('/login');
      return;
    }
     return;
    setLoading(true);

    try {
      const url = `${SERVER}/playlist/addToPlaylist/${id}`;
      const options = {
        method: 'POST',
        headers: { "auth-token": Token }
      }

      const res = await fetch(url, options);
      const data = await res.json();

      console.log('add to playlist', data);

      if (data.success === true){

        toast.success(data.msg);

        // dispatch(addLecture(data.course))
      }
      else toast.error(data.msg);

    } catch (error) {
      toast.error(error);
      console.log(error);

    }

    setLoading(false);
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

        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={(!img || img === undefined) ? demo : img}
            // src={
            //   'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            // }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
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
        
            {/* <Button  >Add To Playlist</Button> */}

          <Link to='/lectures' >  <Button backdropBlur={'sm'} colorScheme='red.500' background={'red.200'} boxShadow={'md'} >Watch Now</Button></Link>
            <Buttons title={'Add To Playlist'} loading={loading} handleClick={handleAddToPlaylist} />
          </Flex>

          {/* <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex> */}
        </HStack>
      </Box>
    </Center>
  )
}