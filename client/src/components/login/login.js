import React, { Component } from 'react'
import axios from 'axios'

import {
   IonPage,
   IonItem,
   IonLabel,
   IonInput,
   IonCard,
   IonCardHeader,
   IonCardContent,
   IonToast,
   IonNote
} from '@ionic/react';


const API = 'http://localhost:9000/login' // pass this to component from app?

class Login extends Component {
   constructor(props){
      super(props)
      this.state = {
         email: '',
         password: '',
         emailError: '',
         passwordError: '',
         error: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   validate = () => {
      console.log('validate login')
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
      console.log(this.state)
      if (isValid) {
         axios.post(API, {
            email: event.target.email.value,
            password: event.target.password.value
         })
         .then(response => {
            console.log(response)
         })
         .catch(error => {
            console.log(error.response)
            this.setState({error: error.response})
            console.log(event)
         })
      }
   }

   render() {
      return (
         <IonPage>
            <IonCard>
               <IonCardHeader> Login </IonCardHeader>
               <IonCardContent>
                  <form onSubmit={this.handleSubmit}>

                     <IonToast
                        isOpen= {this.state.error != ''}
                        header= {this.state.error}
                        messge= {this.state.error}
                        onDidDissmiss= {this.state.error= ''}
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
                     <ion-button type='submit'>Submit</ion-button>
                  </form>
               </IonCardContent>
            </IonCard>
         </IonPage>
      )
   }
}

export default Login





