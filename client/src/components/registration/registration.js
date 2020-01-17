import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';

import { isEmail } from 'validator';

const required = (value, props) => {
   if (!value || (props.isCheckable && !props.checked)) {
      return <span className="form-error is-visible">Required</span>;
   }
};

const email = (value) => {
   if (!isEmail(value)) {
      return <span className="form-error is-visible">{value} is not a valid email.</span>;
   }
};

const isEqual = (value, props, components) => {
   const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
   const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

   if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
      return <span className="form-error is-visible">Passwords are not equal.</span>;
   }
};

class Registration extends Component {
   handleSubmit = (event) => {
      event.preventDefault();

      console.log(event);
   };

   render() {
      return (
         <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
            <h3>Registration</h3>
            <label>
               Spray Name*
               <Input
                  placeholder="choose a real or fake name, it's all for fun"
                  type="text"
                  name="spray"
                  validations={[required]}
               />
            </label>
            <label>
               Mountain Project User Id Number*
               <Input
                  placeholder="the numbers in your url when you go to your profile"
                  type="text"
                  name="mpId"
                  validations={[required]}
               />
            </label>
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
                  validations={[required, isEqual]}
               />
            </label>
            <label>
               Confirm password*
               <Input
                  placeholder="Confirm password"
                  type="password"
                  name="confirm"
                  validations={[required, isEqual]}
               />
            </label>
            <label>
               I accept policy to only spray when I flash folks' projects in my crocs*
               <Input
                  type="checkbox"
                  name="policy"
                  value="1"
                  validations={[required]}
               />
            </label>
            <Button className="button">Submit</Button>
         </Form>
      )
   }
}

export default Registration





