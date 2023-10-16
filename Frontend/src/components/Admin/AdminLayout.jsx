import React from 'react'

import { Grid,Box, Container } from '@chakra-ui/react'

//Admin Component Stuff
import Sidebar from './Sidebar'

const AdminLayout = ({children}) => {
  return (
    <>
      <section id="AdminLayout">

        <Grid templateColumns={['1fr','2fr 6fr']} >
            
            {/* Sidebar show for navigation  */}
            <Sidebar />
            

            {/* Here the children to show related page data  */}
            <Box my='2' p='2'>
                {children}
            </Box>
        </Grid>
      </section>
    </>
  )
}

export default AdminLayout
