import React from 'react'

import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'

//Icons Stuff
import { AiFillLinkedin } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

//Components Stuff
import TextHighlight from './TextHighlight'


const Footer = () => {

  return (
    <>
      <footer id="footer">
        <Box padding={4} bg={'blackAlpha.100'}>
          <Stack direction={['column', 'row']} justifyContent={['center','space-evenly']} w={'full'}>

            <VStack textAlign={['center','left']}>
              <Text> <TextHighlight title={'Coursera'} /> Discover Uncertain Things</Text>
              <Text fontSize={'sm'}>Coursera is help the users to learn new technologies with practical stuff, so keep connect and <Text textTransform={'uppercase'}> <TextHighlight title={'subscribe'} /> </Text></Text>
            </VStack>

            {/* Social Media Links to connect with us  */}
            <HStack alignItems={'center'} justifyContent={'center'}>
              <a href="https://linkedin.com/in/nik4furi" rel="noreferrer" target='_blank'><AiFillLinkedin color='purple' size={'30'} /> </a>
              <a href="https://github.com/nik4furi" rel="noreferrer" target='_blank'><BsGithub color='purple' size={'30'} /> </a>
            </HStack>


          </Stack>
          <Text textAlign={'center'} my={'3'}> Copyright &copy;<TextHighlight title={'coursera'} />@2023 | All rights reserved</Text>
        </Box>
      </footer>
    </>
  )
}

export default Footer
