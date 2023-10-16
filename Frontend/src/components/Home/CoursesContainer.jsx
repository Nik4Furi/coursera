import React from 'react'
import SearchBox from './SearchBox'
import { Box, Heading, Text } from '@chakra-ui/react'

const CoursesContainer = () => {
  return (
    <>
        <section id="Courses">

            <Box>
                <Text children='Search Your Best Fit' />
                <Heading as={'h3'} children ='Choose Course, What You Want Learn 📖' />
            </Box>

            {/* Showing the searching container, to filter courses  */}
            <SearchBox />            

        </section>
    </>
  )
}

export default CoursesContainer
