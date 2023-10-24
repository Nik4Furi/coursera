import React, { useEffect } from 'react';

//------------- Redux store specific stuff
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, handleChangeUserRole, handleDeleteUser } from '../../Store/AdminSlice';

import { Box, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, VStack, Td, HStack, Image } from '@chakra-ui/react'

//Icons/Images Stuff
import { AiFillDelete } from 'react-icons/ai'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import Loading from '../../components/Layout/Loading';


const Users = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(fetchAllUsers()); //api to fetch all the users
    }, [dispatch]);


    const UserTableHeads = ['name', 'email', 'avatar', 'subscription', 'role'];

    //-------------- Function to change the role of the users -------X
    const ChangeUserRole = async (id) => {
        dispatch(handleChangeUserRole(id));
    }



    //------------ Function to delete the users 
    const DeleteUser = async (id) => {
        dispatch(handleDeleteUser(id));
    }

    return (
        <>
            <AdminLayout>
                <Box>
                    <VStack>
                        <TextHighlight size='xl' title='Users' />

                        {/* Here we show the table data of the users  */}
                        <Box w={'full'} >
                            <DataShowInTable data={users} ChangeRole={ChangeUserRole} loading={loading}
                                DeleteUser={DeleteUser}
                                tabelTitle={'users'} tablesHeads={UserTableHeads} />
                        </Box>

                    </VStack>
                </Box>
            </AdminLayout>
        </>
    )
}

export default Users;

export const DataShowInTable = ({ tablesHeads, ChangeRole, data, DeleteUser, loading }) => {

    return (
        <>
            {loading && <Loading />}
            <Box overflowX={['scroll','hidden']}>
            <TableContainer >
                <Table variant='striped' colorScheme='blackAlpha.200'>
                    <TableCaption>All availables users here</TableCaption>
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
                    <Tbody>{data?.map((item, i) => (
                        <Tr key={i}>

                            <Td>{i + 1}</Td>
                            <Td>{item?.name}</Td>
                            <Td>{item?.email}</Td>
                            <Td><Image rounded={'md'} maxW={'90px'} src={item?.avatar?.url} /></Td>
                            <Td >{item?.subscription?.status}</Td>
                            <Td >{item?.role}</Td>
                            <Td>
                                <HStack>

                                    <Buttons loading={loading} handleClick={() => ChangeRole(item._id)} title='Change Role' />   <AiFillDelete cursor={'pointer'} onClick={() => DeleteUser(item._id)} />
                                </HStack>
                            </Td>

                        </Tr>
                    ))}


                    </Tbody>

                </Table>
            </TableContainer>

            </Box>
        </>
    )
}
