import React, { useEffect, useState } from 'react'

import { Button, Grid, HStack, Input, Text } from '@chakra-ui/react'

//Global Function stuff
import { CoursesCategories } from '../../GlobalFunctions';

//Component
import CourseCard from './CourseCard'
import Buttons from '../Layout/Buttons';
import Loading from '../Layout/Loading';

const SearchBox = ({ courses }) => {


    //----------- States Specific Stuff ---------------X
    const [keyword, setKeyword] = useState(''); //used to search in title of courses
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

    return (
        <>
            <HStack my={'5'}>
                <Input type='search' name='keyword' id='keyword' shadow={'sm'} outlineColor={'purple.200'} value={keyword} onChange={handleOnChange} outline={'purple'} focusBorderColor='purple' borderColor={'purple.200'} placeholder='title of course ...' />
            </HStack>

            {/* Now we show the set of keywords  */}
            <HStack overflowX={"auto"} padding={'8'} sx={{ "&::--webkit-scrollbar": { display: 'none' } }} >
                <Buttons title={'Clear All'} minW={"40"} handleClick={handleClearAll} />

                {CoursesCategories.map((item, index) => (
                    <Button onClick={() => handleSelectCategory(item)} key={index} minW={"60"} >
                        <Text textTransform={'capitalize'} variant={"ghost"} children={item} />
                    </Button>
                ))}


            </HStack>

            {/* Showing the cards of the courses, where we apply the filterations -----------X */}


            {!filterCourse && <Loading />}

            {filterCourse.length === 0 && <Text>No Course Result Found</Text>}

            <Grid templateColumns={['1fr', '1fr 1fr']} gap={4} my={'4'}>
                {filterCourse && filterCourse.map((item, i) => (
                    <CourseCard key={i} img={item?.poster?.url} title={item.title} description={item.description} category={item.category} lectureCount={item.totalVideos} id={item._id} />
                ))}
            </Grid>

        </>
    )
}

export default SearchBox
