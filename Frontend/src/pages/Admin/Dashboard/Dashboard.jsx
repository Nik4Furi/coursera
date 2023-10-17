import React from 'react'

import { Box, Grid, HStack, Heading, Progress, Stack, Text, VStack } from '@chakra-ui/react'

//Admin Layout Stuff
import AdminLayout from '../../../components/Admin/AdminLayout'

//Icons/Images Specific Stuff
import { MdOutlineViewSidebar, MdPayment } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

//Components Stuff
import TextHighlight from '../../../components/Layout/TextHighlight'
import { DoughnutChart, LineChart } from '../../../components/Admin/DashboardCharts'


const Dashboard = () => {
    return (
        <>
            <AdminLayout >

                <section id="Dashboard">

                    <Heading>Dashboard</Heading>

                    <Text textAlign={'center'} my='2' size={'sm'}> Last Change On {String(new Date()).split('G')[0]} </Text>

                    {/* Here is the container, where we show assets like views,users and subscription */}
                    <Box my='2' p='2'>
                        <Stack justifyContent={'space-evenly'} direction={['column', 'row']} spacing={'4'}>
                            <AssetsCard qty={120} title='Views' qtyPercentage={80} />
                            <AssetsCard qty={120} title='Users' qtyPercentage={80} />
                            <AssetsCard qty={120} title='Subscription' profitable={false} qtyPercentage={80} />
                        </Stack>
                    </Box>

                    {/* Here We showing the charts is related to the dataset  */}
                    <Box my='2' p={['0','10']} display={'block'} mx={'auto'} boxShadow={'2xl'} >
                        <LineChart/>

                    </Box>

                    <Box my='5' p='2'>
                        <Grid p='3' justifyContent={'space-between'} templateColumns={['1fr', '4fr 3fr']}>

                            {/* Here We show the users profit or not compare to last month  */}
                            <Box>
                                <TextHighlight size='md' title='Progress Bar 📈' />

                                <VStack align={'center'} justifyContent={'start'}>

                                    <ProgressBar title={'Views'} value={123} />
                                    <ProgressBar title={'Users'} value={83} />
                                    <ProgressBar title={'Subscribe'} value={20} profit={false} />
                                </VStack>

                            </Box>

                            {/* Here we show the users, who subscribe or who is not  */}
                            <Box display={'block'} mx='auto' h={'40vh'}>
                            <TextHighlight color='salmon' size='md' title='Users' />

                            {/* Doughut graph  */}
                            <DoughnutChart />

                            </Box>
                        </Grid>


                    </Box>

                </section>

            </AdminLayout>
        </>
    )
}

export default Dashboard


//------------------ Card to show assets are in form of profitables or not
export const AssetsCard = ({ title, icon, profitable = true, qty, qtyPercentage }) => {
    return (

        <Box w='50%' p='3' borderRadius={'md'} boxShadow={'dark-lg'} my='2' mx='2'>

            {/* Here we showing the stats counts and title of stats card  */}
            <Heading size={'sm'}>{title}</Heading>
            <HStack justify={'space-between'}>
                <Heading > <strong>{qty}</strong></Heading>

                <HStack spacing={'1'} justifyContent={'space-evenly'}>
                    <Text color={profitable ? 'green.200' : 'red.200'}>{qtyPercentage}</Text>
                    <Text color={profitable ? 'green.200' : 'red.200'}><strong>{profitable ? <BiUpArrowAlt display={'inline'} color='green.200' /> : <BiDownArrowAlt display={'inline'} color='red.200' />} </strong></Text>
                </HStack>

            </HStack>
            <Text mt='1' size={'sm'}>Since Last Month</Text>

        </Box>
    )
}

//-------------- Create a progress bar to showing the processing of our app
export const ProgressBar = ({ title, value, profit = true }) => {
    // const profit = 100-value;
    return (
        <Box p='3' w='full' my='3' boxShadow={'dark-lg'}>

            <Heading size={'md'} >{title}</Heading>
            <HStack>

                <Text>{profit ? (value > 100 ? value - 100 : value) : `-${value}`}%</Text>

                <Progress colorScheme={`${profit ? 'purple' : 'red'}`} w='full' value={value} />

                <Text>100%</Text>
            </HStack>

        </Box>
    )
}