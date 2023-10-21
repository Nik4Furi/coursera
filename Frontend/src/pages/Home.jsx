import React, { Suspense, lazy } from 'react'

import { Link } from 'react-router-dom'

//Chakra UI Components
import { Text, Container, Heading, Stack, VStack, Button, Image, Box, HStack } from '@chakra-ui/react'

//-------------- Images/Icons Container----------------------X
import Header from '../assets/images/header-3.webp'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'

//Components Stuff
import TextHighlight from '../components/Layout/TextHighlight'
import Buttons from '../components/Layout/Buttons'
import Loading from '../components/Layout/Loading'

const CoursesContainer = lazy(() => import('../components/Home/CoursesContainer'));


function Home() {

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
            <Suspense fallback={<Loading />}>
              <CoursesContainer /></Suspense>
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
