import React,{useState} from 'react'

import { Box, Container, FormControl, FormLabel, Heading, InputGroup, Textarea, VStack } from '@chakra-ui/react'

//Icons/Images Specific Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

//Global Function Stuff
import { CoursesCategories } from '../GlobalFunctions';

//Components Specific Stuff
import FormInput from '../components/Layout/FormInput';
import Buttons from '../components/Layout/Buttons';

const ContactUS = () => {

    //------------------ Form Specific Stuff ----------------

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        msg:''
    });


    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('formdata ', formData);
    }


    return (
        <>
            <section id="ContactUS">
                <Container minH={'container.sm'} >

                    <Heading>Contact With US 📞</Heading>

                    <form>
                        <VStack>
                            <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' id='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' id='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            {/* <Textarea placeholder='Type your msg here' name='msg' id='msg' value={formData.msg} onChange={handleOnChange} /> */}

                            <AddTextArea label={'Enter Your Msg'} name='msg'  value={formData.msg} handleChange={handleOnChange} placeholder={'Enter your msg here'} />

                            <Box w={'full'} p='2' my='4'>
                                <Buttons handleClick={handleSubmit} fontsize='lg' display={'block'} mx='auto' width="full" title={'Send'} />
                            </Box>

                        </VStack>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default ContactUS




// ---------------- Text area of to writing the msg 
export const AddTextArea = ({label,value,handleChange,name,placeholder,my='2'})=>{
    return (
        <FormControl isRequired my={my}>
                
        {label && <FormLabel> {label}: </FormLabel>}

        <InputGroup>
            <Textarea placeholder={placeholder} name={name} id={name} value={value} onChange={handleChange} />

        </InputGroup>

    </FormControl>
    )
}

