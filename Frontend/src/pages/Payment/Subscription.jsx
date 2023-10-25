import React, { useEffect, useState } from 'react'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

//--------Redux Store Specific Stuff
import { useDispatch, useSelector } from 'react-redux'
import { handleSubscription } from '../../Store/UsersSlice'


//Global Functions Stuff
import { SERVER, Token } from '../../GlobalFunctions'

//Components Stuff
import Buttons from '../../components/Layout/Buttons'
import Loading from '../../components/Layout/Loading'
import { Navigate } from 'react-router-dom'


const Subscription = () => {

  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { user,subscription,loading } = useSelector(state => state.user);

  useEffect(() => {

    if (subscription?.id) {

      const openPopUp = () => {
        var options = {
          "key": key, // Enter the Key ID generated from the Dashboard
          "currency": "INR",
          "name": "Coursera", //your business name
          "description": "Become a premium member of Coursera",
          "subscription_id": subscription?.id,
          // "image": "https://example.com/your_logo",
          // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": `${SERVER}/payment/paymentVerification?user_id=${user?._id}`,
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": user?.name, //your customer's name
            "email": user?.email,
            "contact": "" //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
            "address": "Cousera - Learning New Stuff Always"
          },
          "theme": {
            "color": "#3399cc"
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();

      }

      openPopUp();
    }
  }, [dispatch, subscription?.id, setKey,key,user?.email,user?.name,user?._id]);

  //--------------- Function to pay for the subscription
  const handlePaySubscription = async () => {

    const res = await fetch(`${SERVER}/payment/getSecretKey`, {
      headers: {
        'auth-token': Token
      }
    });
    const data = await res.json();

    setKey(data.secretKey);

    dispatch(handleSubscription());

  }

  if(user?.subscription?.status === 'active')
    return <Navigate to='/profile' />

  return (
    <>
      <section id="Subscription" style={{ minHeight: '60vh',padding:'10px' }}>

        {loading && <Loading />}

        <Heading textAlign={'center'}>Become A Pro Pack Member</Heading>

        <VStack  boxShadow={'dark-lg'} justifyContent={'center'} alignItems={'center'} width={['100%','50%']} my={'4'} mx={['5','auto']} spacing={'5'} >

          <Box bg='blackAlpha.50' boxShadow={'sm'} w={'full'} p={'3'} >Pro Pack* <strong>299</strong></Box>

          <Box p={'2'} textAlign={'center'}  >

            <Text>Become a pro pack member or join the community, and get access to watch all the videos</Text>

            <Heading my='2'>&#x20B9;299 Only</Heading>

            <Buttons handleClick={handlePaySubscription} title='Buy Now' />

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
