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

const API = 'http://localhost:9000/register' // pass this to component from app?

class Registration extends Component {
   constructor(props){
      super(props)
      this.state = {
         sprayName: '',
         email: '',
         mpId: '',
         password: '',
         confirmPassword: '',
         sprayNameError: '',
         mpIdError: '',
         emailError: '',
         passwordError: '',
         error: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   validate = () => {
      console.log('validate')
      let sprayNameError = ''
      let mpIdError = ''
      let emailError = ''
      let passwordError = ''

      if (!this.state.sprayName) {
         sprayNameError = 'sprayName cannot be blank'
      } else {
         const name = this.state.sprayName
         let re = /^\S+$/
         if (!re.test(name)){
            sprayNameError = 'sprayName must be a combination of two or more nonwhitespace characters'
         }
      }

      if (!this.state.mpIdError) {
         mpIdError = 'remember who you really are'
      } else {
         const mpId = this.state.mpId
         let re =  /^d{9}/
         if (!re.test(mpId)){
            mpIdError = 'please enter your nine digit Mountain Project ID'
         }
      }

      if (!this.state.email) {
         emailError = 'you shall not pass'
      } else {
         if (!this.state.email.includes('@')) {
            emailError = 'invalid email'
         }
      }

      if (!(this.state.password || this.state.confirmPassword)) {
         passwordError = 'please enter and confirm your password'
      } else {
         if (this.state.password != this.state.confirmPassword) {
            passwordError = 'passwords dont match'
         }
      }

      if (sprayNameError || emailError || passwordError){
         this.setState({ sprayNameError, emailError, passwordError })
         return false
      }
      return true

   }

   handleChange = (event) => {
      console.log('changed')
      const name = event.target.name
      const value = event.target.value

      this.setState({
         [name]: value
      })
      console.log(this.state)
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      console.log(this.state)
      if (isValid) {
         axios.post(API, {
            sprayName: event.target.sprayName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            mpId: event.target.mpId.value
         })
         .catch(error => {
            console.log(error.response)
            this.setState({error: error.response.data})
         })
      }
   }

   render() {
      const { error } = this.state.error
      return (

         <IonPage>
            <IonCard>
               <IonCardHeader> Registration </IonCardHeader>
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
                           Spray Name*
                        </IonLabel>
                        <IonInput
                           type= 'text'
                           name='sprayName'
                           value={this.state.sprayName}
                           onIonBlur={this.handleChange}
                        />
                     </IonItem>
                     <IonNote slot='end' color='danger'>
                        {this.state.sprayNameError}
                     </IonNote>

                     <IonItem>
                        <IonLabel>
                           Mountain Project User Id*
                        </IonLabel>
                        <IonInput
                           type='text'
                           name='mpId'
                           value={this.state.mpId}
                           onIonBlur={this.handleChange}
                        />
                     </IonItem>
                     <IonNote slot='end' color='danger'>
                        {this.state.mpIdError}
                     </IonNote>

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
                     <IonItem>
                        <IonLabel>
                           Confirm password*
                        </IonLabel>
                        <IonInput
                           type="password"
                           name="confirmPassword"
                           value={this.state.confirmPassword}
                           onIonBlur={this.handleChange}
                        />
                     </IonItem>
                     <ion-button type='submit'>Submit</ion-button>
                  </form>
               </IonCardContent>
            </IonCard>
         </IonPage>
      )
   }
}

export default Registration





