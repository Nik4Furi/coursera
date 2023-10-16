import { Button, Container, HStack, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const categories = ["Web Development", "App Development", "Data Science", "AI Learning", "Machine Learning", "Cloud Computing"];
  return (
    <>
      <section id="courses">
        <Container m={'5'} minH={"85vh"} >
          <Heading children="Our courses to make you perfect" />
          <HStack>

            <Input type='search' fontWeight={"bold"} value={keyword} onChange={(e) => setKeyword(e.target.value)} focusBorderColor='purple' />
            <Button className='btn-primary' >Search</Button>
          </HStack>

          <HStack overflowX={"auto"} css={{ "&::--webkit-scrollbar": { display: "none" } }}>
            {
              categories.map((item, index) => (
                <Button key={index} minW={"60"} >
                  <Text variant={"ghost"} children={item} />
                </Button>
              ))
            }

          </HStack>

        </Container>
      </section>
    </>
  )
}

export default Courses
