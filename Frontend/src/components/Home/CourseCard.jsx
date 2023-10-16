import React from 'react'

import { Box, GridItem, Heading, Image, Text } from '@chakra-ui/react'

//Components
import Buttons from '../Layout/Buttons'

const CourseCard = () => {



  return (
    <>

      <GridItem width={'100%'} bg={'tomato'} >
        {/* <Image /> */}

        <Box>
          <Heading children='This is data of card' />
          <Text >this is description of the card</Text>
        </Box>

        <Box>
          <Text>Created By: <strong>creator</strong> </Text>
          <Text>Total Videos: <strong>creator</strong> </Text>
          <Text>Last Update: <strong>creator</strong> </Text>
        </Box>

        <Box>
          <Buttons title={'Add To Playlist'} />
        </Box>

      </GridItem>
    </>
  )
}

export default CourseCard