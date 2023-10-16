import React from 'react'

import {Button, Text} from '@chakra-ui/react'

const Buttons = ({colorscheme='purple',size,variant,isloading,loadingtext,title, mx='3',display,width,fontsize='md',handleClick,color}) => {
  return (
    <>
     { isloading ?
     <Button isLoading loadingText={loadingtext}  colorScheme='purple' size={'md'} variant={'solid'} >{title}</Button>
     :
     <Button onClick={handleClick} color={color} variant={variant}  colorScheme={colorscheme} size={'md'} width={width} display={display} mx={mx} ><Text fontSize={fontsize} >{title}</Text></Button>}
    </>
  )
}

export default Buttons
