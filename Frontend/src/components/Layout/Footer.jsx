import { Box, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import TextHighlight from './TextHighlight'

import {AiFillLinkedin} from 'react-icons/ai'
import {BsGithub} from 'react-icons/bs'

// const link = process.env.REACT_APP_FRONTEND_URI;
const link = 'http://localhost:3000';

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <Box p={4} bg={'blackAlpha.100'}>
                <Stack direction={['column','row']} justifyContent={'space-evenly'} w={'full'}>

                    <VStack textAlign={'left'}>
                        <span> <TextHighlight title={'Coursera'} /> Discover Uncertain Stuff</span>
                        <Text fontSize={'sm'}>Coursera is help the users to learn new technologies with practical knowledge, so keep connect and <TextHighlight title={'subscribe'} /> US </Text>
                    </VStack>
                    
                    {/* Social Media Links to connect with us  */}
                    <HStack >
                        <a href="https://linkedin.com/in/nik4furi" target='_blank'><AiFillLinkedin color='purple' size={'30'} /> </a>
                        <a href="https://github.com/nik4furi" target='_blank'><BsGithub color='purple' size={'30'} /> </a>
                    </HStack>

                
                </Stack>
                <Text textAlign={'center'} my={'3'}> Copyright &copy; <a href={link} target="_blank" rel="noopener noreferrer"><TextHighlight title={'coursera'} /></a>@2023 || All rights reserved</Text>
        </Box>
      </footer>
    </>
  )
}

export default Footer
