import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button'
import React, { Component } from 'react';

const required = (value) => {
   if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return 'require';
   }
};

const email = (value) => {
   if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`
   }
};

const lt = (value, props) => {
   // get the maxLength from component's props
   if (value.toString().trim().length > props.maxLength) {
      // Return jsx
      return <span className="error">The value exceeded {props.maxLength} symbols.</span>
   }
};

const password = (value, props, components) => {
   // NOTE: Tricky place. The 'value' argument is always current component's value.
   // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
   // But if we're changing 'confirm' component - the condition will always be true
   // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
   if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
      // 'confirm' - name of input
      // components['confirm'] - array of same-name components because of checkboxes and radios
      return <span className="error">Passwords are not equal.</span>
   }
};



class Registration extends Component {
   render() {
      return (
         <Form>
            <h3>Registration</h3>
            <div>
               <label>
                  Email*
                  <Input value='email@email.com' name='email' validations={[required, email]}/>
               </label>
            </div>
            <div>
               <label>
                  Password*
                  <Input type='password' name='password' validations={[required]}/>
               </label>
            </div>
            <div>
               <Button>Submit</Button>
            </div>
         </Form>
      )
   }
}

export default Registration








// // uses https://raw.githubusercontent.com/Lesha-spr/react-validation/master/src/App.js
// // for validation
// import React from 'react'
// import axios from 'axios'
// import validator from 'validator'
// import Form from 'react-validation/build/form'

// import './registration.css'

// const required = (value, props) => {
//    if (!value) {
//       prompt("fuck you")
//       return <span> Required</span>;

//    }
// };

// const email = (value) => {
//    if (!validator.isEmail(value)) {
//       return <span className="form-error is-visible">${value} is not a valid email.</span>;
//    }
// };

// const isEqual = (value, props, components) => {
//    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
//    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

//    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
//       return <span className="form-error is-visible">Passwords are not equal.</span>;
//    }
// };

// class Registration extends React.Component {
//    constructor(props) {
//       super(props)
//       this.state = {
//          formData: {}, // Contains login form data
//          errors: {}, // Contains login field errors
//          formSubmitted: false, // Indicates submit status of login form
//          loading: false // Indicates in progress state of login form
//       }

//       this.handleChange = this.handleChange.bind(this)
//       this.handleSubmit = this.handleSubmit.bind(this)
//    }

//    handleChange(event) {
//       const target = event.target
//       const value = event.value
//       const name = event.name

//       let { formData } = this.state
//       formData[name] = value

//       this.setState({
//          formData: formData
//       })

//       console.log('blurred')
//       // this.form.validateAll()
//    }

//    handleSubmit(event) {
//       event.preventDefault()
//       console.log('submit was clicked')
//    }

//    render() {
//       return(
//          <Form onSubmit = {this.handleSubmit}>
//             <input type = 'text' onBlur = {this.handleChange} validations = {[required, email]} />
//             EMAIL
//             <input type = 'text' onBlur = {this.handleChange} />
//             MOUNTAIN PROJECT USER ID
//             <input type = 'text' onBlur = {this.handleChange} />
//             PASSWORD
//             <input type = 'text' onBlur = {this.handleChange} />
//             RE-ENTER Password
//             <input type = 'submit' value = "SUBMIT" />
//          </Form>
//       )
//    }
// }

// export default Registration
// {/* <div className="box"> */}
// {/*    <h1>Register</h1> */}
// {/*    <form onSubmit={this.handleSubmit}> */}
// {/*       <div className="input-group"> */}
// {/*          <input type="text" id="username" onBlur="checkInput(this)" /> */}
// {/*          <label htmlFor="username">Username</label> */}
// {/*       </div> */}
// {/*       <div className="input-group"> */}
// {/*          <input type="text" id="mpId" onBlur="checkInput(this)" /> */}
// {/*          <label htmlFor="mpId">Mountain Project User ID</label> */}
// {/*       </div> */}
// {/*       <div className="input-group"> */}
// {/*          <input type="password" id="password" onBlur="checkInput(this)" /> */}
// {/*          <label htmlFor="password">Password</label> */}
// {/*       </div> */}
// {/*       <div className="input-group"> */}
// {/*          <input type="password" id="password2" onBlur="checkInput(this)" /> */}
// {/*          <label htmlFor="password2">re-enter password</label> */}
// {/*       </div> */}
// {/*       <input type="submit" value="Enter" /> */}
// {/*    </form> */}
// {/* </div> */}

