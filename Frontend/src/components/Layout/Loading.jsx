import React from 'react'

import { Box, Spinner, VStack } from '@chakra-ui/react'

const Loading = () => {
    
    return (
        <>
            <VStack align={'center'} h='100vh' justifyContent={'center'}>
                <Box>
                    <Spinner color='purple.500' size={'xl'} thickness='2px' speed='0.55s' />
                </Box>
            </VStack>
        </>
    )
}

export default Loading
