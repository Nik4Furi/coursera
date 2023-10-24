import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Box, HStack, Text } from '@chakra-ui/react'

//Icons/Images Stuff
import { AiFillDashboard, AiOutlineUser } from 'react-icons/ai'
import { GiMaterialsScience } from 'react-icons/gi'
import { IoIosCreate } from 'react-icons/io'


const Sidebar = () => {

  const location = useLocation();

  return (
    <>
      <section id="Sidebar">
        <Box w={['90%','full']} m={['5','0']} p='2' boxShadow='dark-lg'>

          <SideBarLink title={'dashboard'} icon={<AiFillDashboard />} active={location.pathname === '/admin/dashboard'} />
          <SideBarLink title={'Create Course'} link={'createcourse'} icon={<AiOutlineUser />} active={location.pathname === '/admin/createcourse'} />
          <SideBarLink title={'users'} icon={<GiMaterialsScience />} active={location.pathname === '/admin/users'} />
          <SideBarLink title={'courses'} icon={<IoIosCreate />} active={location.pathname === '/admin/courses'} />


        </Box>
      </section>
    </>
  )
}

export default Sidebar


// ---------------- Link of the sidebar 
export const SideBarLink = ({ title, icon, active, link }) => {
  return (
    <Link to={`/admin/${link ? link : title}`} style={{ width: '100%' }}> <HStack my='2' mx='auto' textTransform={'capitalize'} textColor={active ? 'salmon' : ''}>
      <Text>{icon}</Text> <Text>{title}</Text>  </HStack> </Link>
  )
}