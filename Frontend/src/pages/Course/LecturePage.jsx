import React, { useEffect, useState } from 'react'

import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react'

// import IntroVideo from '../../assets/videos/intro.mp4'
import { Link, Navigate, useParams } from 'react-router-dom'

//---------Redux Store specific stuff
import { useDispatch, useSelector } from 'react-redux'
import { fetchLectures } from '../../Store/CourseSlice'
import Loading from '../../components/Layout/Loading'
import Buttons from '../../components/Layout/Buttons'

const LecturePage = ({ user }) => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  useEffect(() => {

    dispatch(fetchLectures(id));

  }, [dispatch, id]);

  if (user?.role !== 'admin' && user?.subscription?.status !== 'active')
    return <Navigate to='/subscribe' />


  return (
    <>
      <section id="LecturePage" style={{minHeight:'80vh',padding:'2px'}}>
        {loading && <Loading />}

        {(lectures?.length === 0 || !lectures) ? <><Heading size='lg' textAlign={'center'}>No lecture is avialable in this course, YET</Heading> <Link to='/'><Buttons title="Go Home" display={'block'} mx='auto' my='4' /></Link> </> :

          <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} >



            {/* Video lecture stuff, to help the users to watch */}
            <GridItem  >
              <Box minW={'full'}>
                <video width={'100%'} controls controlsList='nodownload normoteplayback' disablePictureInPicture disableRemotePlayback src={lectures?.[lectureNumber]?.videos?.url} > </video>
              </Box>

              <Box p='5'>
                <Heading textTransform={'capitalize'} size='xl'>Lecture #{lectureNumber + 1}: {lectures?.[lectureNumber]?.title}</Heading>
                <Heading textDecoration={'overline'} size='md' my='3' py='3'>Description</Heading>
                <Text>{lectures?.[lectureNumber]?.description}</Text>
              </Box>

            </GridItem>

            {/* This section to show the lectures  */}
            <GridItem p='1'>
              {
                lectures?.map((item, i) => (
                  <Button mx={'auto'} key={i} onClick={() => setLectureNumber(i)} p='2' variant={'ghost'} w={'full'} display={'block'} borderBottom={'1px solid blackAplpha.300'}>
                    <Box boxShadow={'md'} id='lecture1'  >Lecture {i + 1}</Box></Button>
                ))
              }

            </GridItem>

          </Grid>
        }
      </section>
    </>
  )
}

export default LecturePage
