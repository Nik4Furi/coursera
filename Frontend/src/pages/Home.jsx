import React from 'react'

import { Link } from 'react-router-dom'

//Chakra UI Components
import { Text, Container, Heading, Stack, VStack, Button, Image, Box, HStack } from '@chakra-ui/react'

//-------------- Images/Icons Container----------------------X
import Header from '../assets/images/header-3.webp'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'
import TextHighlight from '../components/Layout/TextHighlight'
import Buttons from '../components/Layout/Buttons'
import CoursesContainer from '../components/Home/CoursesContainer'

<<<<<<< HEAD
function Home({isAuthenticated}) {


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


=======
function Home() {
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
  return (
    <>
      <section id="Home">

        <Container maxW={'container.lg'} mt={'5'} >

          <Stack direction={["column", "row"]} h={'50vh'} >


            <VStack >
              <Heading> <TextHighlight title={'Coursera'} colorscheme='yellow' size='xl' /> , Kick Your Career Now  </Heading>
              <Text>Here you find the coursee, which are mostly realted to the computer science branches, and we are provide the subscription options to checkout all the lectures, and that will lead your skills sets</Text>
              <Text>Try our all courses list,Don't Wait 👇 </Text>

              <Box >
<<<<<<< HEAD
                <a href='#Courses' ><Buttons title='Explore Courses' /></a>
                {isAuthenticated ? <Link to={'/profile'}><Buttons title='Profile' /></Link> :
                <Link to={'/login'}><Buttons title='Login' /></Link>}
=======
              <a href='#Courses' ><Buttons title='Explore Courses' /></a>
              <Link to={'/login'}><Buttons title='Login' /></Link>
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
              </Box>

            </VStack>

            <Box >
              <Image src={Header} borderRadius='md' />
            </Box>

          </Stack>

          {/* Here we show all the courses list to need to search  */}
          <section>
            <CoursesContainer />
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
