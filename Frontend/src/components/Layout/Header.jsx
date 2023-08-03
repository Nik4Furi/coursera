import React from 'react'

import { Link } from 'react-router-dom'

import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, VStack, useDisclosure } from '@chakra-ui/react'

import { RiArrowRightLine } from 'react-icons/ri'


function Header() {

  const { isOpen, onClose, onOpen } = useDisclosure

  //----------- Creat a Link component to show the links-------------X
  const LinkButton = (url, title) => {
    <Link to={url}>
    <Button variant={'ghost'}  >{title}</Button>
    </Link>
  }

  return (
    <>
      <ColorModeSwitcher />

      {/* Arrow to switch out the side bar  */}
      <Button onClick={onOpen} className='btn-primary' pos={"fixed"} top={"6"} left={"3"} zIndex={100} >
        <RiArrowRightLine />
      </Button>

      {/* Drawer to open the sidebar  */}
      {/* <Drawer placement='left' isOpen={true}  >
        this is drawer
        <DrawerOverlay backdropBlur={"blur(1px)"} >
          this is draewr overlay

        </DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            Welcome Arjun
          </DrawerHeader>
          <DrawerBody >


            <VStack background={'red'} w={"5"} >
              <LinkButton url='/' title="Home" />
              <LinkButton url='/courses' title="Courses" />
              <LinkButton url='/contact' title="Contact US" />
            </VStack>

          </DrawerBody>
        </DrawerContent>

      </Drawer> */}
    </>
  )
}

export default Header
