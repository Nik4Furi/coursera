import React from 'react'

import { Heading } from '@chakra-ui/react'

const TextHighlight = ({ title, size = 'md', as = 'span', color = 'salmon' }) => {

  return (
    <>
      <Heading as={as} size={size} color={color} >{title}</Heading>
    </>
  )
}

export default TextHighlight
