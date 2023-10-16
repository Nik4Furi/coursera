import React from 'react'

import './about.module.css'

import { Link } from 'react-router-dom'

import { HStack, Heading, Stack, VStack, Text, Box, Image, Container } from '@chakra-ui/react'

//Icons/Image Stuff
import Intro from '../../assets/images/demo.gif'
import Me from '../../assets/images/me3.png'

//Components Stuff
import TextHighlight from '../../components/Layout/TextHighlight'
import Buttons from '../../components/Layout/Buttons'

const About = () => {
  return (
    <>
      <section id="About">

        <section id="Header">
          <Stack p='6' direction={['column', 'row']} alignItems={'center'} justifyContent={['center','space-between']} textAlign={'left'}>

            <VStack >
              <Heading textAlign={'left'}> <TextHighlight size='xl' title='Coursera' />: Learn New Tech 📚 </Heading>
              <Text >We are offering many courses mostly related to the Computer Sciences and Technology</Text>
              <Text>Can have option to searching the best fit courses, what you need to learn, because in Era, have to need to learn things fast and efficient way, so before processed further, need to pay for becomming a <Link to='/subscribe'> <TextHighlight title='subscription' /></Link> user </Text>

              <HStack alignItems={'center'} justifyContent={'space-evenly'}>
                <Link to={'/'}> <Buttons title='Explore Courses' /></Link>
                <Link to={'/subscribe'}><Buttons title='Subscription' /></Link>
              </HStack>
            </VStack>

            <Box width={'55%'}>
              <Image src={Intro} boxShadow={'dark-lg'} width={'full'}  />
            </Box>

          </Stack>
        </section>

        {/* Section to give intro about me or developer who developed */}
        <div style={{background:'#343F4F',padding:'6px',minHeight: '60vh',color:'white'}} >
        <h1 style={{textAlign:'center',fontSize:'2rem',margin:'4px'}} >About Me </h1>

          {/* <Container >
          <h2 style={{fontSize:'1.5rem'}}>Hello 👋</h2> 
          <p>Read about the developer here, can also go their profiles to watch the work <a href="#footer">Click Here👇 </a> </p>

          </Container> */}
          
    
        <section id="AboutMe" >
              
              <div className="wrapper">
                <div className="static-txt">I'm </div>
                <ul className="dynamic-txts">
                  <li><span>Nikhil Gurjar</span></li>
                  <li><span>A Student</span></li>
                  <li><span>A Developer</span></li>
                  <li><span>Sports Player</span></li>
                </ul>
              </div>

              <div>
                <img src={Me} alt="About me" style={{width:'100%'}} />
              </div>

        </section>
        </div>

      </section>
    </>
  )
}

export default About
