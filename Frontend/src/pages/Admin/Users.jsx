import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { Box, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, VStack, Text, Td, Tfoot, HStack, Image } from '@chakra-ui/react'

import toast from 'react-hot-toast'

//Icons/Images Stuff
import { AiFillDelete } from 'react-icons/ai'

//Global Functions
import { SERVER, Token } from '../../GlobalFunctions'

//Layout
import AdminLayout from '../../components/Admin/AdminLayout'

//Components
import Buttons from '../../components/Layout/Buttons'
import TextHighlight from '../../components/Layout/TextHighlight'
import { ChangeUserRole, DeleteUser, adminClearAll, changeUserRole, fetchAllUsers, removeUser } from '../../store/AdminSlice';


const Users = () => {

    const dispatch = useDispatch();
    const { users: allUsers} = useSelector(state => state.admin);

    //-------Call the api to fetch all the users
    useEffect(() => {

        dispatch(fetchAllUsers()); // call api to fetch all the users

        dispatch(adminClearAll()); //clear all the api stuff

        // console.log('delte user ',success,msg,loading)


    }, [dispatch]);

    const UserTableHeads = ['name', 'email', 'avatar', 'role'];
    const [loading,setLoading] = useState(false);

      //-------------- Function to change the role of the users -------X
      const handleChangeUserRole = async (id) => {

        setLoading(true);
        try {

            const url = `${SERVER}/admin/updateUserProfile/${id}`;
            const options = {
                method: 'PUT',
                headers: {
                    "auth-token": Token
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();

            console.log('change role ', data);

            if (data.success === true){
                toast.success(data.msg);
                dispatch(changeUserRole(id));
            }
            else toast.error(data.msg)

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }

        setLoading(false);
    }

  

    //------------ Function to delete the users 
    const handleDeleteUser = async (id) => {
        console.log('delte user id ', id);

        setLoading(true);
        try {

            const url = `${SERVER}/admin/deleteUser/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    "auth-token": Token
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();

            console.log('delete user ', data);

            if (data.success === true){
                toast.success(data.msg);

                dispatch(removeUser(id));
            }
                
            else toast.error(data.msg)

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }

        setLoading(false);
    }

    return (
        <>
            <AdminLayout>

                <section id='Users'>
                    <VStack>
                        <TextHighlight size='xl' title='Users' />

                        {/* Here we show the table data of the users  */}
                        <Box overflowX={'auto'}>
                            <DataShowInTable data={allUsers} handleFunction={handleChangeUserRole} loading={loading}
                                handleDelete={handleDeleteUser}
                                tabelTitle={'users'} tablesHeads={UserTableHeads} />
                        </Box>

                    </VStack>
                </section>

            </AdminLayout>
        </>
    )
}

export default Users;

export const DataShowInTable = ({ tabelTitle, tablesHeads, handleDelete, data,handleFunction,loading }) => {
    console.log('data at the courses ',data);
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
                <Tbody>{
                   tabelTitle === 'users' 
                   ? data?.map((item, i) => (
                    <Tr key={i}>

                        <Td>{i + 1}</Td>
                        <Td>{item?.name}</Td>
                        <Td>{item?.email}</Td>
                        <Td><Image rounded={'md'} maxW={'90px'} src={item?.avatar?.url} /></Td>
                        <Td >{item?.role}</Td>
                        <Td>
                            <HStack>

                                <Buttons loading={loading} handleClick={() => handleFunction(item._id)} title={`${tabelTitle === 'users' ? 'Change Role' : 'Watch Lectures'}`} />   <AiFillDelete cursor={'pointer'} onClick={() => handleDelete(item._id)} /> </HStack>  </Td>
                        {/* <Td isNumeric>30.48</Td> */}
                    </Tr>
                ))
                   :  data?.map((item, i) => (
                    <Tr key={i}>

                        <Td>{i + 1}</Td>
                        <Td>{item?.title}</Td>
                        <Td><Text noOfLines={2}> {item?.description}</Text></Td>
                        <Td><Image src={item?.poster?.url} /></Td>
                        <Td >{item?.category}</Td>
                        <Td isNumeric>{item?.views}</Td>
                        <Td isNumeric>{item?.totalVideos}</Td>
                        <Td>
                            <HStack>

                                <Buttons loading={loading} handleClick={() => handleFunction(item._id)} title= 'Watch Lectures' />   <AiFillDelete cursor={'pointer'} onClick={() => handleDelete(item._id)} /> </HStack>  </Td>
                        {/* <Td isNumeric>30.48</Td> */}
                    </Tr>
                ))
                    }


                </Tbody>

            </Table>
        </TableContainer>
    )
}
