import React from 'react'

import { Box, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, VStack, Text, Td, Tfoot, HStack, Image } from '@chakra-ui/react'

//Icons/Images Stuff
import { AiFillDelete } from 'react-icons/ai'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'


const Users = () => {
    const UserTableHeads = ['name', 'email', 'avatar', 'role']
    return (
        <>
            <AdminLayout>

                <section id='Users'>
                    <VStack>
                        <TextHighlight size='xl' title='Users' />

                        {/* Here we show the table data of the users  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable tabelTitle={'users'} tablesHeads={UserTableHeads} />
                        </Box>

                    </VStack>
                </section>

            </AdminLayout>
        </>
    )
}

export default Users;

export const DataShowInTable = ({ tabelTitle, tablesHeads,handleFunction,handleDelete }) => {
    return (

        <TableContainer>
            <Table variant='striped' colorScheme='blackAlpha.200'>
                <TableCaption>All availables {tabelTitle === 'users' ? 'users' : 'courses'} here</TableCaption>
                <Thead textAlign={'center'}>
                    <Tr>
                        <Th>S.No.</Th>
                        {tablesHeads.map((item, i) => (

                            <Th key={i}>{item}</Th>
                        ))}
                        <Th>Action</Th>
                        {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                </Thead>
                <Tbody>
               
                    <Tr>
                        <Td>1.</Td>
                        <Td>centimetres (cm)</Td>
                        <Td>millimetres (mm)</Td>
                        <Td><Image /></Td>
                        <Td isNumeric>inches</Td>
                        <Td>
                            <HStack>

                                <Buttons handleClick={handleFunction}  title={`${tabelTitle === 'users' ? 'Change Role' : 'Watch Lectures'}`} />   <AiFillDelete cursor={'pointer'} onClick={handleDelete} /> </HStack>  </Td>
                        {/* <Td isNumeric>30.48</Td> */}
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
