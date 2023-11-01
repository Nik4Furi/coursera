import React from 'react'

import {Box, Heading,Text,VStack} from '@chakra-ui/react'

//Components Stuff
import Buttons from '../../components/Layout/Buttons'

const Subscription = () => {
<<<<<<< HEAD

  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { user, loading } = useSelector(state => state.user);

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


  useEffect(() => {

    if (user?.subscription?.id) {
      //---------function to open modal to pay by the user
      const openPopUp = () => {
        var options = {
          "key": key, // Enter the Key ID generated from the Dashboard
          "currency": "INR",
          "name": "Coursera", //your business name
          "description": "Become a premium member of Coursera",
          "subscription_id": user?.subscription?.id,
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


  }, [dispatch, user?.subscription?.id, setKey, key, user?.email, user?.name, user?._id]);


  if (user?.subscription?.status === 'active')
    return <Navigate to='/profile' />

  // if()

  return (
    <>
      <section id="Subscription" style={{ minHeight: '60vh', padding: '10px' }}>
=======
  return (
    <>
      <section id="Subscription" style={{minHeight:'60vh'}}>
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

          <Heading textAlign={'center'}>Become A Pro Pack Member</Heading>

          <VStack boxShadow={'dark-lg'} justifyContent={'center'} alignItems={'center'} width={'50%'} my={'4'} mx={'auto'} spacing={'5'} >

<<<<<<< HEAD
        <VStack boxShadow={'dark-lg'} justifyContent={'center'} alignItems={'center'} width={['100%', '50%']} my={'4'} mx={['5', 'auto']} spacing={'5'} >
=======
            <Box bg='blackAlpha.50' boxShadow={'sm'} w={'full'} p={'3'} >Pro Pack* <strong>299</strong></Box>
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

            <Box p={'2'} textAlign={'center'}  >

            <Text>Become a pro pack member or join the community, and get access to watch all the videos</Text>

            <Heading my='2'>&#x20B9;299 Only</Heading>

<<<<<<< HEAD
            <Box w={'full'} p='2' my='4' display={'block'} mx='auto'>
              <Buttons handleClick={handlePaySubscription} title='Buy Now' />
            </Box>

=======
            <Buttons title='Buy Now' />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

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
