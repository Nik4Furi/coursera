import React, { useRef } from 'react'

import { Link } from 'react-router-dom'

import { ColorModeSwitcher } from '../../ColorModeSwitcher'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Box,
  VStack,
  Stack,
} from '@chakra-ui/react'

import { RiArrowRightLine } from 'react-icons/ri'
import Buttons from './Buttons'


function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();


  return (
    <>
      <section id="Header">
        <Box bg={'blackAlpha.50'} w={'100%'} position={'relative'} h='16'>
          <ColorModeSwitcher />

          {/* Arrow to switch out the side bar  */}
          <Button onClick={onOpen} className='btn-primary' pos={"fixed"} top={"4"} left={"2"} zIndex={100} >
            <RiArrowRightLine />
          </Button>

          {/* Drawer to show our data like a sidenavbar  */}
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerCloseButton  /> */}
              <DrawerHeader>Coursera: Discover Things 📖</DrawerHeader>

              <DrawerBody>
                <VStack >
                  <Link to={'/'}><Button onClick={onClose} variant={'ghost'}>Home</Button></Link>
                  <Link to={'/subscribe'}><Button onClick={onClose} variant={'ghost'}>Subscribe</Button></Link>
                  <Link to={'/contact'}><Button onClick={onClose} variant={'ghost'}>Contact US</Button></Link>
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Stack direction={['column', 'row']} justifyContent={['center', 'space-around']} w={'full'} >
                  <Link to={'/login'}> <Buttons handleClick={onClose} title={'Login'} /></Link>
                  <Link to={'/requestcourse'}> <Buttons handleClick={onClose} title={'Request A Course'} /></Link>
                </Stack>
                {/* <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button> */}
                {/* <Button colorScheme='blue'>Save</Button> */}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </section>
    </>
  )
}

export default Header
