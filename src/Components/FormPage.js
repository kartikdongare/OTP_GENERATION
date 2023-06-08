import { ErrorMessage, Field, Formik ,Form} from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
const FormPage = () => {
  const nav=useNavigate()
  const[details,setDetails]=useState({
    name:'',
    email:'',
    mobile:'',
    panNo:'',
    city:'',
  })
  console.log(details);
  let formSchema=yup.object().shape({
    name:yup.string().max(140).required(),
    email:yup.string().max(255).matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email must be in valid format').required().email('please enter in valid format'),
    mobile:yup.string().max(10).required(),
    panNo:yup.string().max(10).matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,'PAN No must be in valid format').required(),
    city:yup.string().required(),
  })
  let handleSubmit=(values)=>{
    window.sessionStorage.setItem('name',values.name)
    setDetails(values)
    console.log('values',values.name);
     nav('/otppage')
  }
  return (
    <div className='bd'>
      <Formik
      initialValues={details}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Full Name</label>
           <div > <Field type='text' name='name' className='input1'/></div>
            <div className='error'><ErrorMessage name='name'/></div>
          </div>
          <div>
            <label>Email I'd</label>
            <div > <Field type='text' name='email' className='input1'/></div>
            <div className='error'><ErrorMessage name='email'/></div>
          </div>
          <div>
            <label>Mobile No</label>
            <div className='A1'>+91<Field type='text' name='mobile' className='input3'/></div>
            <div className='error'><ErrorMessage name='mobile'/></div>
          </div>
          <div>
            <label>PAN No</label>
            <div > <Field type='text' name='panNo' className='input1'/></div>
            <div className='error'><ErrorMessage name='panNo'/></div>
          </div>
          <div>
            <label>City</label>
            <div> <Field type='text' name='city' className='input1'/></div>
            <div className='error'><ErrorMessage name='city'/></div>
          </div>
          <button type='submit'>Submit</button>
        </Form>
       
      </Formik>
    </div>
  )
}

export default FormPage
