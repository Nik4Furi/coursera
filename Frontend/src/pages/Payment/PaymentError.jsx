import React from 'react'

import {Link} from 'react-router-dom'

import {Container, HStack, Image, VStack,Text} from '@chakra-ui/react'

//Images Stuff
import Error from '../../assets/images/paymentError.png'

//Components
import Buttons from '../../components/Layout/Buttons'


const PaymentError = () => {
  
  return (
    <>
      <section id="PaymentError">
        <Container mx={'auto'} mt={'12'} minH={'container.sm'}>

            <VStack>
                <Image src={Error} alt='payment success' width={'290px'} />

                <Text>Your payment is not completed, Please Try Again 🙏</Text>

                <HStack justifyContent={'space-evenly'} align={'center'} my='3'>
                    <Link to='/'> <Buttons title='Go Home' /> </Link>
                    <Link to='/subscribe'> <Buttons title='Subscribe' /> </Link>
                </HStack>
            </VStack>

        </Container>
      </section>
    </>
  )
}

export default PaymentError
