import React, { useState } from 'react'

import { Button, Grid, HStack, Input, Stack, Text } from '@chakra-ui/react'

import { CoursesCategories } from '../../GlobalFunctions';

import CourseCard from './CourseCard';

const SearchBox = () => {

    //----------- States Specific Stuff ---------------X
    const [keyword, setKeyword] = useState(''); //used to search in title of courses
<<<<<<< HEAD
    const [filterCourse, setFilterCourse] = useState([]);

    useEffect(() => { setFilterCourse(courses) }, [courses])


    //------------ Function to on change on the search bar filter data
    const handleOnChange = (e) => {
        let value = e.target.value;
        setKeyword(value);

        value = value.toLowerCase();

        //Now apply filter on the title
        if (value.length > 3) {

            const filterData = filterCourse.filter(item => item.title.includes(value));

            setFilterCourse(filterData);
        }
        else setFilterCourse(courses);

    }

    //---------- During click on the categories buttons handle the filter
    const handleSelectCategory = (value) => {

        //During click on the categories buttons, then clear first filterdata
        setFilterCourse('');

        //Now apply filter on the title
        const filterData = courses.filter(item => item.category === value);

        setFilterCourse(filterData);

    }

    //-------------- Function to clear all the data
    const handleClearAll = () => {
        setKeyword('');
        setFilterCourse(courses);
    }
=======
    const [category, setCategory] = useState(''); //used in to set keyword, and search course
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

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
<<<<<<< HEAD


            {!filterCourse && <Loading />}

            {filterCourse.length === 0 && <Text>No Course Result Found</Text>}

            <Grid templateColumns={['1fr', '1fr 1fr']} gap={4} my={'4'}>
                {filterCourse && filterCourse.map((item, i) => (
                    <CourseCard key={i} img={item?.poster?.url} title={item.title} description={item.description} category={item.category} lectureCount={item.totalVideos} id={item._id} />
                ))}
            </Grid>
=======
            <Grid templateColumns='repeat(2,1fr)' gap={4} my={'4'}>
  {/* <GridItem colSpan={2} h='10' bg='tomato' />
  <GridItem colStart={4} colEnd={6} h='10' bg='papayawhip' /> */}
  <CourseCard />
  <CourseCard />
  <CourseCard />
</Grid>
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

        </>
    )
}

export default SearchBox
