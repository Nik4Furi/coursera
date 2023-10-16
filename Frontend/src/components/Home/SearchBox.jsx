import React, { useState } from 'react'

import { Button, Grid, HStack, Input, Stack, Text } from '@chakra-ui/react'

import { CoursesCategories } from '../../GlobalFunctions';

import CourseCard from './CourseCard';

const SearchBox = () => {

    //----------- States Specific Stuff ---------------X
    const [keyword, setKeyword] = useState(''); //used to search in title of courses
    const [category, setCategory] = useState(''); //used in to set keyword, and search course

    return (
        <>
            <HStack my={'5'}>
                <Input type='search' shadow={'sm'} value={keyword} onChange={(e) => setKeyword(e.target.value)} outline={'purple'} focusBorderColor='purple' borderColor={'purple.200'} placeholder='title of course ...' />
            </HStack>

            {/* Now we show the set of keywords  */}
            <HStack overflowX={"auto"} padding={'8'} sx={{"&::--webkit-scrollbar":{display:'none'}}} >

                {CoursesCategories.map((item, index) => (
                    <Button key={index} minW={"60"} >
                        <Text variant={"ghost"} children={item} />
                    </Button>
                ))}

            </HStack>


            {/* Showing the cards of the courses, where we apply the filterations -----------X */}
            <Grid templateColumns='repeat(2,1fr)' gap={4} my={'4'}>
  {/* <GridItem colSpan={2} h='10' bg='tomato' />
  <GridItem colStart={4} colEnd={6} h='10' bg='papayawhip' /> */}
  <CourseCard />
  <CourseCard />
  <CourseCard />
</Grid>

        </>
    )
}

export default SearchBox
