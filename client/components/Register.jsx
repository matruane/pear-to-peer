import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { postNewUser } from '../slices/usersSlice'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userData)
  const [form, setForm] = useState({
    auth0Id: '',
    email: '',
  })

  useEffect(() => {
    setForm({
      auth0Id: user?.auth0Id,
      email: user?.email,
    })
  }, [user])

  function handleSubmit(formData) {
    console.log('handleSubmit', formData)
    const userToSave = {
      ...formData,
      auth0Id: user.auth0Id,
      email: user.email,
    }
    dispatch(postNewUser(userToSave))
    navigate('/')
  }

  //TODO: handle loading state

  return (
    <div>
      <Heading>Register Your Details</Heading>
      {form.auth0Id != '' ? (
        <Formik
          initialValues={{ ...form, name: '', username: '', postcode: '' }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form>
              {console.log('props', props)}
              <Field name='auth0Id'>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor='auth0Id'>Auth0 ID:</FormLabel>
                    <Input
                      {...field}
                      id='auth0Id'
                      value={props.values.auth0Id}
                      disabled
                    ></Input>
                  </FormControl>
                )}
              </Field>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor='email'>Email:</FormLabel>
                    <Input
                      {...field}
                      id='email'
                      value={props.values.email}
                      disabled
                    ></Input>
                  </FormControl>
                )}
              </Field>
              <Field name='name'>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor='name'>Your name:</FormLabel>
                    <Input {...field} id='name'></Input>
                  </FormControl>
                )}
              </Field>
              <Field name='username'>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor='username'>Display name:</FormLabel>
                    <Input {...field} id='username'></Input>
                  </FormControl>
                )}
              </Field>
              {/* TODO: validate postcode, only allow numbers */}
              <Field name='postcode'>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor='postcode'>Postal Code:</FormLabel>
                    <Input {...field} id='postcode'></Input>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='teal' type='submit'>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>Loading..</p>
      )}
      {/* <label htmlFor='auth0Id'>Auth0 Id:</label>
        <input
          type='text'
          id='auth0Id'
          name='auth0Id'
          value={form.auth0Id}
          disabled
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          value={form.email}
          disabled
        />
        <button onClick={handleClick}>Register</button> */}
    </div>
  )
}