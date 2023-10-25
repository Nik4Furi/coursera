import React from 'react'

import {Box, Heading,Text,VStack} from '@chakra-ui/react'

//Components Stuff
import Buttons from '../../components/Layout/Buttons'

const Subscription = () => {
  return (
    <>
      <section id="Subscription" style={{minHeight:'60vh'}}>

          <Heading textAlign={'center'}>Become A Pro Pack Member</Heading>

          <VStack boxShadow={'dark-lg'} justifyContent={'center'} alignItems={'center'} width={'50%'} my={'4'} mx={'auto'} spacing={'5'} >

            <Box bg='blackAlpha.50' boxShadow={'sm'} w={'full'} p={'3'} >Pro Pack* <strong>299</strong></Box>

            <Box p={'2'} textAlign={'center'}  >

            <Text>Become a pro pack member or join the community, and get access to watch all the videos</Text>

            <Heading my='2'>&#x20B9;299 Only</Heading>

            <Buttons title='Buy Now' />

            </Box>
<Box bg={'blackAlpha.200'} w='full' p='3'>
            <Text> 100% refund, If cancellation after 7 days</Text>
            <Text fontSize={'9px'}>Terms & Condition Apply*</Text>
            </Box>

          </VStack>
        
      </section>
    </>
  )
}

export default Subscription
