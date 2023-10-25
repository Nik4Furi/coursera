import React from 'react'

import {Link} from 'react-router-dom'

import {Container, HStack, Image, VStack,Text} from '@chakra-ui/react'

//Images Stuff
import Confeti from '../../assets/images/confeti.png'


//Components
import Buttons from '../../components/Layout/Buttons'

const PaymentSuccess = () => {
  return (
    <>
      <section id="PaymentSuccess">
        <Container mx={'auto'} my={'auto'} minH={'container.sm'}>

            <VStack>
                <Image src={Confeti} alt='payment success' width={'290px'} />

                <Text >Your Payment Successfully Completed, Now You Are Our Subscribed User</Text>

                <HStack justifyContent={'space-evenly'} align={'center'} my='3'>
                    <Link to='/'> <Buttons title='Go Home' /> </Link>
                    <Link to='/user/dashboard'> <Buttons title='Dashboard' /> </Link>
                </HStack>
            </VStack>

        </Container>
      </section>
    </>
  )
}

export default PaymentSuccess
