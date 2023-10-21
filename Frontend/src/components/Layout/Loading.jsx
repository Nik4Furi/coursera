import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <>
            <VStack align={'center'} h='100vh' justifyContent={'center'}>
                <Box>
                    <Spinner size={'xl'} thickness='2px' speed='0.55s' />
                </Box>
            </VStack>
        </>
    )
}

export default Loading
