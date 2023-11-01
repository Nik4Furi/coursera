import React,{useState} from 'react'

import { Box, Container, FormControl, FormLabel, Heading, InputGroup, Textarea, VStack } from '@chakra-ui/react'

import toast from 'react-hot-toast'

//Icons/Images Specific Stuff
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

//Global Function Stuff
import { SERVER } from '../GlobalFunctions';

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
    const [loading,setLoading] = useState(false);

    //Function to handle the onchange event on input data
    const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   //---------- Function to submit the form data or can say login the users 
   const handleSubmit = async(e) => {
    e.preventDefault();

    setLoading(true);

    //---------- Validation the email
    if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(formData.email) === false){
        toast.error(`${formData.email} is not valid`)
        setFormData({...formData,email:''});
        setLoading(false);
        return;
    }

    //----------- Call the api to send the mail for course request
    try {
        
        const url = `${SERVER}/contact`;
        const options = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
        };

        const res = await fetch(url,options);
        const data = await res.json();

        if(data.success === true)
            toast.success(data.msg);
        else
            toast.error(data.msg);

        setLoading(false);
        setFormData({name:'',email:'',msg:''});

    } catch (error) { 
        toast.error(error);
    }
}


    return (
        <>
            <section id="ContactUS">
                <Container minH={'container.sm'} >

                    <Heading>Contact With US 📞</Heading>

                    <form onSubmit={handleSubmit}>
                        <VStack>
                            <FormInput type={'text'} label={'Enter Name'} icon={<AiOutlineUser />} name='name' placeholder={'John Doe'} value={formData.name} handleChange={handleOnChange} minlen={5} maxlen={80} />

                            <FormInput type={'email'} label={'Enter Email'} icon={<AiOutlineMail />} name='email' placeholder={'johndoe23@gmail.com'} value={formData.email} handleChange={handleOnChange} minlen={5} maxlen={120} />

                            <AddTextArea maxlen={400} minlen={10} label={'Enter Your Msg'} name='msg'  value={formData.msg} handleChange={handleOnChange} placeholder={'Enter your msg here'} />

                            <Box w={'full'} p='2' my='4'  display={'block'} mx='auto'>
                                <Buttons type='submit'loading={loading} fontsize='lg' width="full" title={'Send'} />
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
export const AddTextArea = ({label,value,handleChange,name,placeholder,my='2',minlen,maxlen,border='0.5px solid',outline='purple'})=>{
    return (
        <FormControl isRequired my={my}>
                
        {label && <FormLabel> {label}: </FormLabel>}

        <InputGroup>
            <Textarea minLength={minlen} maxLength={maxlen} placeholder={placeholder} name={name} id={name} value={value} onChange={handleChange} border={border} outline={outline} />

        </InputGroup>

    </FormControl>
    )
}

