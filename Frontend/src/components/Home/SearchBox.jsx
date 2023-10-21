import React, { useEffect, useState } from 'react'

import { Button, Grid, HStack, Heading, Input, Stack, Text, filter } from '@chakra-ui/react'


//Global Function stuff
import { CoursesCategories } from '../../GlobalFunctions';


//Component
import CourseCard from './CourseCard'
import Loading from '../Layout/Loading';
import Buttons from '../Layout/Buttons';
import { useSelector } from 'react-redux';

const SearchBox = ({ courses }) => {

    const course = useSelector(state => state.course.courses);

    //----------- States Specific Stuff ---------------X
    const [keyword, setKeyword] = useState(''); //used to search in title of courses
    const [filterCourse, setFilterCourse] = useState(course || []);

    useEffect(() => {
        setFilterCourse(courses);
    }, []);

    //------------ Function to on change on the search bar filter data
    const handleOnChange = (e) => {
        let value = e.target.value;
        console.log(value, e)
        setKeyword(value);

        value = value.toLowerCase();

        //Now apply filter on the title
        // const filterData = filterCourse.filter(item =>(console.log('check item ',item,item.title)));
        if (value.length > 3) {

            const filterData = filterCourse.filter(item => item.title.includes(value));

            setFilterCourse(filterData);
        }
    }

    //---------- During click on the categories buttons handle the filter
    const handleSelectCategory = (value) => {
        console.log(value);

        //Now apply filter on the title
        const filterData = filterCourse.filter(item => item.category === value);

        setFilterCourse(filterData);

    }

    //-------------- Function to clear all the data
    const handleClearAll = () => {
        setKeyword('');
        setFilterCourse(courses);
    }

    if (!filterCourse)
        return <Loading />

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
            <Grid templateColumns='repeat(2,1fr)' gap={4} my={'4'}>

                {!filterCourse && <Text>No course result found</Text>}

                {filterCourse && filterCourse.map((item, i) => (
                    <CourseCard key={i} img={item?.poster?.url} title={item.title} description={item.description} category={item.category} lectureCount={item.totalVideos} id={item._id} />
                ))}
            </Grid>

        </>
    )
}

export default SearchBox
