import React from 'react'

import { Link } from 'react-router-dom'

import { HStack, Heading, Stack, VStack, Text, Box, Image } from '@chakra-ui/react'

//Icons/Image Stuff
import Intro from '../../assets/images/demo.gif'
import Me from '../../assets/images/me.png'

//Components Stuff
import TextHighlight from '../../components/Layout/TextHighlight'
import Buttons from '../../components/Layout/Buttons'

const About = () => {
  return (
    <>
      <Stack p='6' direction={['column-reverse', 'row']} alignItems={'center'} justifyContent={['center', 'space-between']} textAlign={'left'}>

        <VStack >
          <Heading textAlign={'left'}> <TextHighlight size='xl' title='Coursera' />: Learn New Tech 📚 </Heading>
          <Text >We are offering many courses mostly related to the Computer Sciences and Technology</Text>
          <Text>Can have option to searching the best fit courses, what you need to learn, because in Era, have to need to learn things fast and efficient way, so before processed further, need to pay for becomming a <Link to='/subscribe'> <TextHighlight title='subscription' /></Link> user </Text>

          <HStack alignItems={'center'} justifyContent={'space-evenly'}>
            <Link to={'/'}> <Buttons title='Explore Courses' /></Link>
            <Link to={'/subscribe'}><Buttons title='Subscription' /></Link>
          </HStack>
        </VStack>

        <Box width={['0', '55%']} >
          <Image src={Intro} display={['hidden','block']} boxShadow={'dark-lg'} width={['0','full']} />
        </Box>

      </Stack>

      {/* Section to give intro about me or developer who developed */}
      <div style={{ background: '#343F4F', padding: '6px', minHeight: '60vh', color: 'white' }} >
        <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '4px' }} >About Me </h1>

        <section id="AboutMe" >

          <div className="wrapper">
            <div className="static-txt">I'm </div>
            <ul className="dynamic-txts">
              <li><span>Nikhil Gurjar</span></li>
              <li><span>A Student</span></li>
              <li><span>A Developer</span></li>
              <li><span>& Your Friend😆</span></li>
            </ul>
          </div>

          <div className='img' >
            <img src={Me} alt="About me" />
          </div>

        </section>
      </div>
    </>
  )
}

export default About
