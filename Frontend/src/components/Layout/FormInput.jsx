import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

const FormInput = ({ label, icon, type, placeholder, minlen, maxlen, name, value, handleChange, my = '4', css }) => {
    return (
        <>
            <FormControl isRequired my={my}>
                
                {label && <FormLabel> {label}: </FormLabel>}

                <InputGroup>

                    <InputLeftElement pointerEvents='none'> {icon} </InputLeftElement>

                    <Input css={css} type={type} placeholder={placeholder} minLength={minlen} maxLength={maxlen} value={value} onChange={handleChange} name={name} id={name} outline={'purple'} />

                </InputGroup>

            </FormControl>
        </>
    )
}

export default FormInput
