import React from 'react'

import { Text, Container, Heading, Stack, VStack, Button,Image, Box, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

//-------------- Images/Icons Container----------------------X
import Header from '../assets/images/header-3.webp'
import {CgGoogle, CgYoutube} from 'react-icons/cg'
import {SiCoursera, SiUdemy} from 'react-icons/si'
import {DiAws} from 'react-icons/di'

function Home() {
  return (
    <>
      <section id="Home">
        <Container m={"7"} >

        <Stack direction={["column","row"]} h={"100%"} justifyContent={["center","space-between"]} alignItems={"center"} spacing={["16","36"]}  >
         

         <VStack w={"full"} alignItems={["center","flex-start"]} >
          <Heading children="Welcome in coursera, make life in different way" />
          <Text children="Finding the way to fulfill your life with satisfication of the content and yourselves" />
          <Link to={'/courses'} >
            <Button className='btn-primary' >Explore Courses</Button>
          </Link>

         </VStack>

         <Image src={Header} boxSize={"sm"}/>


        </Stack>

        </Container>

        <Box p={"8"} background={"blackAlpha.200"} >

      <Heading children="Our Brands Who Support Us" textAlign={"center"} />

        <HStack justifyContent={"center"} >

          <CgGoogle size={"50"} cursor={"pointer"} color='purple'  />
          <CgYoutube size={"50"} cursor={"pointer"} color='purple' />
          <DiAws size={"50"} cursor={"pointer"} color='purple' />
          <SiCoursera size={"50"} cursor={"pointer"} color='purple' />
          <SiUdemy size={"50"} cursor={"pointer"} color='purple' />
        </HStack>

        </Box>


      </section>
    </>
  )
}

export default Home
