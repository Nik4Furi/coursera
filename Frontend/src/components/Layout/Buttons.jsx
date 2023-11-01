import React from 'react'

import { Button, Text } from '@chakra-ui/react'

const Buttons = ({ minW, colorscheme = 'messenger', size = 'md', variant, loading, loadingtext, title, mx = '3', display, width, fontsize = 'md', handleClick, color, type,px='auto' }) => {
  
  return (
    <>
      {/* {loading ?
        <Button px='auto' isLoading textAlign={'center'} loadingText={loadingtext} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} >{title}</Button> */}

         <Button isLoading={loading} type={type} minW={minW} onClick={handleClick} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} ><Text fontSize={fontsize} >{title}</Text></Button>
    </>
  )
}

export default Buttons
