import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import Textarea from 'react-validation/build/textarea'
import Select from 'react-validation/build/select'
import { isEmail } from 'validator'

const API = 'http://localhost:9000/login' // pass this to component from app?

const required = (value, props) => {
   if (!value || (props.isCheckable && !props.checked)) {
      return <span className="form-error is-visible">Required</span>
   }
}

const email = (value) => {
   if (!isEmail(value)) {
      return <span className="form-error is-visible">{value} is not a valid email.</span>
   }
}


class Login extends Component {
   constructor(props){
      super(props)
      this.state = {
         error: ''
      }
   }

   handleSubmit = (event) => {
      event.preventDefault()
      axios.post(API, {
         email: event.target.email.value,
         password: event.target.password.value
      })
      console.log(event)
   }

   render() {
      return (
         <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
            <h3>Login</h3>
            <label>
               Email*
               <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  validations={[required, email]}
               />
            </label>
            <label>
               Password*
               <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  validations={[required]}
               />
            </label>
            <Button className="button">Login</Button>
         </Form>
      )
   }
}

export default Login





