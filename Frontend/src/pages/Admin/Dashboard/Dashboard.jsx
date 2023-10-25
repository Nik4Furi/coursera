import React, { useEffect } from 'react'

import { Box, Grid, HStack, Heading, Progress, Stack, Text, VStack } from '@chakra-ui/react'

// --------- Redux store specific stuff
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchDashboardStats } from '../../../Store/AdminSlice'

//Admin Layout Stuff
import AdminLayout from '../../../components/Admin/AdminLayout'

//Icons/Images Specific Stuff
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

//Components Stuff
import TextHighlight from '../../../components/Layout/TextHighlight'
import Loading from '../../../components/Layout/Loading'
import { DoughnutChart, LineChart } from '../../../components/Admin/DashboardCharts'


const Dashboard = () => {

    const dispatch = useDispatch();

    const { stats: {
        Counts, Profit, Percentage, statsData
    }, loading } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(handleFetchDashboardStats()); //api to fetch stats for dashboard
    }, [dispatch]);


    return (
        <>
            <AdminLayout >

                <section id="Dashboard" style={{padding : "10px"}}>

                    <Heading>Dashboard</Heading>

                    <Text textAlign={'center'} my='2' size={'sm'}> Last Change On {String(new Date(statsData?.[11]?.createdAt)).split('G')[0]} </Text>

                    {loading && <Loading />}

                    {/* Here is the container, where we show assets like views,users and subscription */}
                    <Box my='2' p='5'>
                        <Stack alignItems={'center'} justifyContent={['center','space-evenly']} direction={['column', 'row']} spacing={'4'}>
                            <AssetsCard qty={Counts?.viewsCount || 0} title='Views' qtyPercentage={Percentage?.viewsPercentage} profitable={Profit?.viewsProfit} />

                            <AssetsCard qty={Counts?.usersCount || 0} title='Users' qtyPercentage={Percentage?.usersPercentage} profitable={Profit?.usersProfit} />

                            <AssetsCard qty={Counts?.subscriptionsCount || 0} title='Subscription' profitable={Profit?.subscriptionsProfit} qtyPercentage={Percentage?.subscriptionsPercentage} />
                        </Stack>
                    </Box>

                    {/* Here We showing the charts is related to the dataset  */}
                    <Box my='2' width={'100%'} p={['5', '10']} display={'block'} mx={'auto'} boxShadow={'2xl'} >
                        <LineChart views={statsData?.map(item => (item.views))} />

                    </Box>

                    <Box my='5' p='2'>
                        <Grid p='3' justifyContent={'space-between'} templateColumns={['1fr', '4fr 3fr']}>

                            {/* Here We show the users profit or not compare to last month  */}
                            <Box>
                                <TextHighlight size='md' title='Progress Bar 📈' />

                                <VStack align={'center'} justifyContent={'start'}>

                                    <ProgressBar title={'Views'} value={Percentage?.viewsPercentage} profit={Profit?.viewsProfit} />
                                    <ProgressBar title={'Users'} value={Percentage?.usersPercentage} profit={Profit?.usersProfit} />
                                    <ProgressBar title={'Subscribe'} value={Percentage?.subscriptionsPercentage} profit={Profit?.subscriptionsProfit} />
                                </VStack>

                            </Box>

                            {/* Here we show the users, who subscribe or who is not  */}
                            <Box display={'block'} mx='auto' h={'40vh'}>
                                <TextHighlight color='salmon' size='md' title='Users' />

                                {/* Doughut graph  */}
                                <DoughnutChart users={[Counts?.subscriptionsCount, Counts?.usersCount - Counts?.subscriptionsCount]} />

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

        <Box w={['100%','50%']} display={['block','inline']}  p='3' borderRadius={'md'} boxShadow={'dark-lg'} my='2' mx={['auto','2']}>

            {/* Here we showing the stats counts and title of stats card  */}
            <Heading size={'sm'}>{title}</Heading>
            <HStack justify={'space-between'}>
                <Heading > <strong>{qty}</strong></Heading>

                <HStack spacing={'1'} justifyContent={'space-evenly'}>
                    <Text color={profitable ? 'green.500' : 'red.500'}>{qtyPercentage }</Text>
                    <Text color={profitable ? 'green.500' : 'red.500'}>%</Text>

                    <Text color={profitable ? 'green.500' : 'red.500'}><strong>{profitable ? <BiUpArrowAlt display={'inline'} color='green.500' /> : <BiDownArrowAlt display={'inline'} color='red.500' />} </strong></Text>

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

                <Text>{value >= 100 ? (value-100)/100+1 : value}%</Text>

                <Progress colorScheme={`${profit ? 'purple' : 'red'}`} w='full' value={value} />

                <Text>100%</Text>
            </HStack>

        </Box>
    )
}