import React from 'react'

import { Button, Text } from '@chakra-ui/react'

const Buttons = ({minW, disable, colorscheme = 'purple', size = 'md', variant, loading, loadingtext, title, mx = '3', display, width, fontsize = 'md', handleClick, color, type }) => {
  return (
    <>
      {loading ?
        <Button isLoading textAlign={'center'} loadingText={loadingtext} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} >{title}</Button>

        : <Button type={type} minW={minW} onClick={handleClick} color={color} variant={variant} colorScheme={colorscheme} size={size} width={width} display={display} mx={mx} ><Text fontSize={fontsize} >{title}</Text></Button>}
    </>
  )
}

export default Buttons
