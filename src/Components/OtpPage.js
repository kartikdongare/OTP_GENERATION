import { ErrorMessage, Field, Form ,Formik} from 'formik';
import React, { useEffect, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { isDisabled } from '@testing-library/user-event/dist/utils';
const OtpPage = () => {
    const nav=useNavigate()
    const [genOtp,setGenOtp]=useState();
    const[name,setName]=useState();
    const [otp ,setOtp]=useState({otpNO:''});
    const [counter,setCounter]=useState(59);
    const [bool,setBool]=useState(true)
    const otpSchema=yup.object().shape({otpNO:yup.string().max(4).matches(genOtp,'otp must be match').required(''),})

   console.log('otp',otp);

    const handleOtpSubmit=(values)=>{
        setOtp(values)
        setCounter(0)
        setBool(false)
    }

   useEffect(()=>{
        otpGenerate()
        setName(window.sessionStorage.getItem('name'))
    },[])

    useEffect(()=>{
        const timer=
        counter > 0 && setInterval(()=>{setCounter(counter-1)},1000);
        return()=>clearInterval(timer)
    },[counter ])
   

    let otpGenerate=()=>{
        let x = Math.floor(Math.random() * 9999)+1001;
        setGenOtp(x)
    }

 console.log('Generated otp',genOtp);
  return (
    <div>
    {otp.otpNO?(
         <Stack sx={{ width: '100%' ,alignContent:'center'}} spacing={2} style={{textAlign:'center'}}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" >
        Thank you for verification {name}
      </Alert></Stack>
    ):null}
   <div className='otp-container'>
    <h1>OTP Page</h1>
      <Formik  initialValues={otp} validationSchema={otpSchema} onSubmit={handleOtpSubmit}>
        <Form>
            <div>
            <label>Enter OTP:-</label>
            <Field 
            type='text' 
            name='otpNO'
             className='inpt'
             />
            <div>
                {counter>0?(<p>Expire otp within &nbsp; 00:{counter}</p>):(bool?(<a onClick={otpGenerate} >Resend</a>):null)}
            </div>
            <p><ErrorMessage name='otpNO'/></p>
            </div>
            <button type='submit'>Verify</button>
        </Form>
      </Formik>
      </div>
      </div>
  )
}

export default OtpPage
