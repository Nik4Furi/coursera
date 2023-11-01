import React from 'react'

import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react'

import IntroVideo from '../../assets/videos/intro.mp4'

const LecturePage = () => {
  return (
    <>
      <section id="LecturePage">
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} >

<<<<<<< HEAD
        {(lectures?.length === 0 || !lectures) ? <><Heading size='lg' textAlign={'center'}>No lecture is avialable in this course, YET</Heading> <Link to='/'><Buttons title="Go Home" display={'block'} mx='auto' my='4' /></Link> </> :
=======
          {/* Video lecture stuff, to help the users to watch */}
          <GridItem  >
            <video width={'100%'} controls controlsList='nodownload normoteplayback' disablePictureInPicture disableRemotePlayback src={IntroVideo} >
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

            </video>

            <Box p='5'>


              <Heading as={'h3'}>Lecture #1: Sample1</Heading>
              <Heading as='h5' my='3'>Description</Heading>
              <Text>this is description</Text>
            </Box>

          </GridItem>

          {/* This section to show the lectures  */}
          <GridItem p='3'>
            <Button mx={'auto'} p='2' variant={'body'} w={'full'} display={'block'} borderBottom={'1px solid blackAplpha.300'}>
              <Box boxShadow={'md'} id='lecture1'  >Lecture 1</Box></Button>
            <Button mx={'auto'} w={'full'} p='2' variant={'body'} display={'block'} borderBottom={'1px solid blackAplpha.300'}>
              <Box boxShadow={'md'} id='lecture3' >Lecture 2</Box> </Button>
            {/* <Box boxShadow={'md'} id='lecture3' >Lecture 3</Box> */}

          </GridItem>

        </Grid>
      </section>
    </>
  )
}

export default LecturePage
