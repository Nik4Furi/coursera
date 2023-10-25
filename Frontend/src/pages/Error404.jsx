import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Buttons from '../components/Layout/Buttons'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <>
      <section id="Error" >
        <Container mx={'auto'} my={'auto'} minH={'60vh'} >
        <VStack alignItems={'center'} justifyContent={'center'} mt={'32'} spacing={'4'} >
            <Heading >404</Heading>

            <Text children='Page Not Found' />

          <Link to='/'> <Buttons title={'Go Home'} /> </Link> 
        </VStack>

        </Container>
      </section>
    </>
  )
}

export default Error404
