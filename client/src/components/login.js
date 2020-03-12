import React, { Component } from 'react'
import axios from 'axios'

import {
   IonItem,
   IonLabel,
   IonInput,
   IonCard,
   IonCardContent,
   IonToast,
   IonNote,
   IonButton
} from '@ionic/react'


const API = 'http://localhost:9000/login' // pass this to component from app?

class Login extends Component {
   constructor(props){
      super(props)
      this.state = {
         email: '',
         password: '',
         emailError: '',
         passwordError: '',
         error: '',
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   validate = () => {
      let emailError= ''
      let passwordError= ''

      if (!this.state.email) {
         emailError= 'please enter an email'
      }

      if (!this.state.password) {
         passwordError= 'please enter your password'
      }

      if (emailError || passwordError){
         this.setState({ emailError, passwordError })
         return false
      }
      return true

   }

   handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value

      this.setState({
         [name]: value
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      if (isValid) {
         axios.post(API, {
            email: event.target.email.value,
            password: event.target.password.value
         })
            .then(response => {
               console.log('axios response \n' + JSON.stringify(response))
               // console.log('response.token ' + response.data.token)
               // console.log('response.sprayName ' + response.data.user.sprayName)
               localStorage.setItem('authToken', response.data.token)
               localStorage.setItem('sprayName', response.data.user.sprayName)
               this.props.loginUpdate()
            })
            // .catch(error => {
            //    console.log(error.response)
            //    this.setState({error: error.response})
            // })
      }
   }

   render() {
      return (
            <IonCard>
               <IonCardContent>
                  <form onSubmit={this.handleSubmit}>

                     <IonToast
                        isOpen= {this.state.error !== ''}
                        header= {this.state.error.data}
                        onDidDissmiss= {() => {this.setState({ error: '' })}}
                        buttons={['OK']}
                     />

                     <IonItem>
                        <IonLabel>
                           Email*
                        </IonLabel>
                        <IonInput
                           type='text'
                           name='email'
                           value={this.state.email}
                           onIonBlur={this.handleChange}
                        />
                     </IonItem>

                     <IonNote slot='end' color='danger'>
                        {this.state.emailError}
                     </IonNote>

                     <IonItem>
                        <IonLabel>
                           Password*
                        </IonLabel>
                        <IonInput
                           type="password"
                           name="password"
                           value={this.state.password}
                           onIonBlur={this.handleChange}
                        />
                     </IonItem>

                     <IonNote slot='end' color='danger'>
                        {this.state.passwordError}
                     </IonNote>
                     <IonButton type='submit'>Submit</IonButton>
                  </form>
               </IonCardContent>
            </IonCard>
      )
   }
}

export default Login





