import React from 'react'

import {Link, useSearchParams} from 'react-router-dom'

import {Container, HStack, Image, VStack,Text} from '@chakra-ui/react'

//Images Stuff
import Confeti from '../../assets/images/confeti.png'

//Components
import Buttons from '../../components/Layout/Buttons'


const PaymentSuccess = () => {

  const referenceId = useSearchParams()[0].get('reference');

  return (
    <>
      <section id="PaymentSuccess">
        <Container mx={'auto'} my={'auto'} minH={'container.sm'}>

            <VStack>
                <Image src={Confeti} alt='payment success' width={'290px'} />

                <Text >Your Payment Successfully Completed, Now You Are Our Subscribed User</Text>
                <Text>ReferenceID is: <strong>{referenceId}</strong></Text>

                <HStack justifyContent={'space-evenly'} align={'center'} my='3'>
                    <Link to='/'> <Buttons title='Go Home' /> </Link>
                    <Link to='/profile'> <Buttons title='Profile' /> </Link>
                </HStack>
            </VStack>

        </Container>
      </section>
    </>
  )
}

export default PaymentSuccess
