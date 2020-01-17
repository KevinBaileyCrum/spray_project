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
    return <span className="form-error is-visible">${value} is not a valid email.</span>;
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
  handleClick = () => {
    this.form.validateAll();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event);
  };

  render() {
    return (
      <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="small-12 columns">
            <h3>Registration</h3>
            <button className="button" type="button" onClick={this.handleClick}>Validate all</button>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Firstname*
              <Input
                placeholder="Firstname"
                type="text"
                name="firstname"
                validations={[required]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              Lastname*
              <Input
                placeholder="Lastname"
                type="text"
                name="lastname"
                validations={[required]}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Email*
              <Input
                placeholder="Email"
                type="email"
                name="email"
                validations={[required, email]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              City*
              <Select
                name="city"
                validations={[required]}
              >
                <option value="">Choose your city</option>
                <option value={1}>London</option>
                <option value={2}>Kyiv</option>
                <option value={3}>New York</option>
              </Select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              Password*
              <Input
                placeholder="Password"
                type="password"
                name="password"
                validations={[required, isEqual]}
              />
            </label>
          </div>
          <div className="small-12 medium-6 columns">
            <label>
              Confirm password*
              <Input
                placeholder="Confirm password"
                type="password"
                name="confirm"
                validations={[required, isEqual]}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <label>
              I accept policy*
              <Input
                type="checkbox"
                name="policy"
                value="1"
                validations={[required]}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 columns">
            <Button className="button">Submit</Button>
          </div>
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
//       return <span> Required</span

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

