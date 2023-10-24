import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import toast from 'react-hot-toast'

//Chakra UI Components
import { Text, Container, Heading, Stack, VStack, Image, Box, HStack } from '@chakra-ui/react'


//--------Redux store stuff
import { useDispatch, useSelector } from 'react-redux'
import { clearCoursesError, fetchCourses } from '../Store/CourseSlice'

//-------------- Images/Icons Container----------------------X
import Header from '../assets/images/header-3.webp'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'

//Components Stuff
import TextHighlight from '../components/Layout/TextHighlight'
import Buttons from '../components/Layout/Buttons'
import CoursesContainer from "../components/Home/CoursesContainer"


function Home() {


  const dispatch = useDispatch();
  const { success, msg, courses } = useSelector(state => state.course);
  
  useEffect(() => {
    dispatch(fetchCourses()); //api call to fetch courses
  }, [dispatch])

  useEffect(() => { //Course Specific Stuff

    if (success === true && msg)
      toast.success(msg);

    else if (success === false && msg)
      toast.error(msg);

    dispatch(clearCoursesError());

  }, [dispatch, success, msg]);


  return (
    <>
      <section id="Home">

        <Container maxW={'container.lg'} mt={'5'} >

          <Stack my={['10','3']} direction={["column-reverse", "row"]} minH={'50vh'} >

            <VStack >
              <Heading> <TextHighlight title={'Coursera'} colorscheme='yellow' size='xl' /> , Kick Your Career Now  </Heading>
              <Text>Here you find the coursee, which are mostly realted to the computer science branches, and we are provide the subscription options to checkout all the lectures, and that will lead your skills sets</Text>
              <Text>Try our all courses list,Don't Wait 👇 </Text>

              <Box >
                <a href='#Courses' ><Buttons title='Explore Courses' /></a>
                <Link to={'/login'}><Buttons title='Login' /></Link>
              </Box>

            </VStack>

            <Box >
              <Image src={Header} borderRadius='md' />
            </Box>

          </Stack>

          {/* Here we show all the courses list to need to search  */}
          <section>
            { courses &&  <CoursesContainer courses={courses} /> }
            </section>

        </Container>

        <section id="Brands">
          <Box p={"8"} background={"blackAlpha.200"} textAlign={'center'} >

            <TextHighlight title={'Our Brands Who Support US'} as='h2' size='xl' />

            <HStack justifyContent={"center"} my={'3'} >

              <CgGoogle size={"30"} cursor={"pointer"} color='purple' />
              <CgYoutube size={"30"} cursor={"pointer"} color='purple' />
              <DiAws size={"30"} cursor={"pointer"} color='purple' />
              <SiCoursera size={"30"} cursor={"pointer"} color='purple' />
              <SiUdemy size={"30"} cursor={"pointer"} color='purple' />
            </HStack>

          </Box>
        </section>


      </section>
    </>
  )
}

export default Home
