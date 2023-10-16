import React from 'react'

import { Box,Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, VStack,Text,Td,Tfoot, HStack } from '@chakra-ui/react'

//Icons/Images Stuff
import {AiFillDelete} from 'react-icons/ai'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'


const Users = () => {
    return (
        <>
            <AdminLayout>

                <section id='Users'>
                    <VStack>
                        <TextHighlight size='xl' title='Users' />

                        {/* Here we show the table data of the users  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable />
                        </Box>

                    </VStack>
                </section>

            </AdminLayout>
        </>
    )
}

export default Users;

export const DataShowInTable = () => {
    return (

        <TableContainer>
            <Table variant='striped' colorScheme='blackAlpha.200'>
                <TableCaption>All availables users here</TableCaption>
                <Thead>
                    <Tr>
                        <Th>S.No.</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Avatar</Th>
                        <Th>Role</Th>
                        <Th>Action</Th>
                        {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>inches</Td>
                        <Td>  <HStack>
                            <Buttons title={'Change Role'} />   <AiFillDelete cursor={'pointer'} /> </HStack> </Td>
                        {/* <Td isNumeric>25.4</Td> */}
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>inches</Td>
                        <Td>
                            <HStack>
                            <Buttons title={'Change Role'} />   <AiFillDelete cursor={'pointer'} /> </HStack>  </Td>
                        {/* <Td isNumeric>30.48</Td> */}
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>inches</Td>
                        <Td>  <HStack>
                            <Buttons title={'Change Role'} />   <AiFillDelete cursor={'pointer'} /> </HStack>  </Td>
                        {/* <Td isNumeric>0.91444</Td> */}
                    </Tr>
                </Tbody>
                {/* <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot> */}
            </Table>
        </TableContainer>
    )
}
