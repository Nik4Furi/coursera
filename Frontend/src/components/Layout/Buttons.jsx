import React from 'react'

import {Button, Text} from '@chakra-ui/react'

<<<<<<< HEAD
const Buttons = ({ minW, colorscheme = 'messenger', size = 'md', variant, loading, loadingtext, title, mx = '3', display, width, fontsize = 'md', handleClick, color, type,px='auto' }) => {
  
  return (
    <>
      {/* {loading ?
        <Button px='auto' isLoading textAlign={'center'} loadingText={loadingtext} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} >{title}</Button> */}

         <Button isLoading={loading} type={type} minW={minW} onClick={handleClick} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} ><Text fontSize={fontsize} >{title}</Text></Button>
=======
const Buttons = ({colorscheme='purple',size,variant,isloading,loadingtext,title, mx='3',display,width,fontsize='md',handleClick,color}) => {
  return (
    <>
     { isloading ?
     <Button isLoading loadingText={loadingtext}  colorScheme='purple' size={'md'} variant={'solid'} >{title}</Button>
     :
     <Button onClick={handleClick} color={color} variant={variant}  colorScheme={colorscheme} size={'md'} width={width} display={display} mx={mx} ><Text fontSize={fontsize} >{title}</Text></Button>}
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
    </>
  )
}

export default Buttons
