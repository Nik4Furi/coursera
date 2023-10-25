import React, { Suspense, lazy } from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'

//Redux Store
import Loading from '../Layout/Loading'

//components
const SearchBox = lazy(() => import('./SearchBox'))

const CoursesContainer = ({ courses }) => {


  return (
    <>
      <section id="Courses">

        <Box>
          <Text children='Search Your Best Fit' />
          <Heading as={'h3'} children='Choose Course, What You Want Learn 📖' />
        </Box>

        {/* Showing the searching container, to filter courses  */}
        <Suspense fallback={<Loading />}>  <SearchBox courses={courses} />     </Suspense>

      </section>
    </>
  )
}

export default CoursesContainer
