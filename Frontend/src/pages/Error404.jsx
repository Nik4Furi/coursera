import React from 'react'

import { Link } from 'react-router-dom'

import { Container, Heading, Text, VStack } from '@chakra-ui/react'

//Components
import Buttons from '../components/Layout/Buttons'

const Error404 = () => {
  return (
    <>
      <section id="Error" >
        <Container mx={'auto'} my={'auto'} minH={'60vh'} >
          <VStack alignItems={'center'} justifyContent={'center'} mt={'32'} spacing={'4'} >
            <Heading size={'4xl'} >404</Heading>

            <Text size={'2xl'} children='Page Not Found' />

            <Link to='/'> <Buttons title={'Go Home'} /> </Link>
          </VStack>

        </Container>
      </section>
    </>
  )
}

export default Error404
