import React from 'react'

import { Box, VStack} from '@chakra-ui/react'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import { DataShowInTable } from './Users'


const AdminCourses = () => {
    return (
        <>
            <AdminLayout>

                <section id='AdminCourses'>
                    <VStack>
                        <TextHighlight size='xl' title='AdminCourses' />

                        {/* Here we show the table data of the AdminCourses  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable />
                        </Box>

                    </VStack>
                </section>

            </AdminLayout>
        </>
    )
}

export default AdminCourses;
