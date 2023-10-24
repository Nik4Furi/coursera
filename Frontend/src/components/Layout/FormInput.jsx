import React from 'react'

import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

const FormInput = ({ label, icon, type, placeholder, minlen, maxlen, name, value, handleChange, my = '4', css, outline = 'salmon', border = '0.5px solid' }) => {
    
    return (
        <>
            <FormControl isRequired my={my}>

                {label && <FormLabel> {label}: </FormLabel>}

                <InputGroup>

                    <InputLeftElement pointerEvents='none'> {icon} </InputLeftElement>

                    <Input css={css} type={type} placeholder={placeholder} minLength={minlen} maxLength={maxlen} value={value} onChange={handleChange} name={name} id={name} outline={outline} border={border} />

                </InputGroup>

            </FormControl>
        </>
    )
}

export default FormInput
