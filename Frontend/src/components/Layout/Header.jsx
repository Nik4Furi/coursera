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
import { useSelector } from 'react-redux'


function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();

  const user = useSelector(state => state.user);


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
                  <Link to={'/course/request'}><Button onClick={onClose} variant={'ghost'}>Request Course</Button></Link>
                  {user.user?.role === 'admin' && user.isAuthenticated === true ? (<Link to={'/admin/dashboard'}><Button onClick={onClose} variant={'ghost'}>Dashboard</Button></Link>) : (user.isAuthenticated === true && <Link to={'/profile'}><Button onClick={onClose} variant={'ghost'}>Profile</Button></Link>)}

                </VStack>
              </DrawerBody>

              <DrawerFooter>

                {user.isAuthenticated === true
                  ? (<Stack direction={['column', 'row']} justifyContent={['center', 'space-around']} w={'full'} >

                   {user.user?.role === 'admin' && <Link to={'/admin/dashboard'}> <Buttons variant={'outline'} handleClick={onClose} title={'Dashboard'} /></Link>}
                   
                    <Link to={'/logout'}> <Buttons handleClick={onClose} title={'Logout'} /></Link>
                  </Stack> ) 
                  : ( <Link to={'/login'}> <Buttons handleClick={onClose} title={'Login'} /></Link>
                  )
                }
                { }

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
