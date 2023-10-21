import React, { Suspense, lazy, useEffect ,useState} from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'

//Global Functions
import { SERVER } from '../../GlobalFunctions'

//Redux Store
import { useDispatch } from 'react-redux'
import { setCourse } from '../../store/CourseSlice'
import Loading from '../Layout/Loading'

//components
const SearchBox = lazy(() => import('./SearchBox'))

const CoursesContainer = () => {

  const dispatch = useDispatch();
  const [courses,setCourses] = useState([]);

  //-------- Function to fetch all the courses
  const FetchAllCourses = async () => {
    try {
      const url = `${SERVER}/course/fetchcourses`;

      const res = await fetch(url);
      const data = await res.json();

      console.log(data, data.courses)

      dispatch(setCourse(data.courses));

      setCourses(data.courses);

    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    FetchAllCourses(); //api to fetching courses
  }, [])

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
