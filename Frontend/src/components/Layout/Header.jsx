import React, { useRef } from 'react'

import { Link } from 'react-router-dom'

// Theme switcher
import { ColorModeSwitcher } from '../../ColorModeSwitcher'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Box,
  VStack,
  HStack,
} from '@chakra-ui/react'

// ---------- Redux store specific stuff
import { useSelector } from 'react-redux'

//Icons stuff
import { RiArrowRightLine } from 'react-icons/ri'

// Components Stuff
import Buttons from './Buttons'



function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const btnRef = useRef();

  const { user, isAuthenticated } = useSelector(state => state.user);


  return (
    <>
      <section id="Header">
        <Box bg={'blackAlpha.300'} position={'relative'} mb='5' zIndex={100} h='16'>
          <ColorModeSwitcher />

          {/* Arrow to switch out the side bar  */}
          <Button onClick={onOpen} colorScheme='purple' position={"fixed"} top='4' left='2'  >
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
              <DrawerHeader>Coursera: Discover Things 📖</DrawerHeader>

              <DrawerBody>
                <VStack >
                  <Link to={'/'}><Button onClick={onClose} variant={'ghost'}>Home</Button></Link>
                  <a href="https://github.com/nik4furi" target='_aboutme' rel="noreferrer"  ><Button onClick={onClose} variant={'ghost'}>About ME</Button></a>
                  <Link to={'/subscribe'}><Button onClick={onClose} variant={'ghost'}>Subscribe</Button></Link>
                  <Link to={'/contact'}><Button onClick={onClose} variant={'ghost'}>Contact US</Button></Link>
                  <Link to={'/course/request'}><Button onClick={onClose} variant={'ghost'}>Request Course</Button></Link>

                </VStack>
              </DrawerBody>

              <DrawerFooter>
                {isAuthenticated ?
                  <>
                    <VStack justifyContent={['center', 'space-between']} w='full'>
                      <HStack my='2' justifyContent={['center', 'space-evenly']} w='full' >

                        <Link to={'/profile'}> <Buttons handleClick={onClose} title={'Profile'} /></Link>

                        <Link to={'/logout'}> <Buttons handleClick={onClose} title={'Logout'} /></Link>

                      </HStack>
                      {user?.role === 'admin' &&
                        <Link to={'/admin/dashboard'}> <Buttons variant={'outline'} handleClick={onClose} title={'Dashboard'} /></Link>}
                    </VStack>
                  </>
                  :
                  <Link to={'/login'}> <Buttons handleClick={onClose} title={'Login'} /></Link>
                }


              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </section>
    </>
  )
}

export default Header
