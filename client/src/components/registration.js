import React, { Component } from 'react'
import { Redirect } from  'react-router-dom'
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
         error: '',
         redirect: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   validate = () => {
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

      if (!this.state.mpId) {
         mpIdError = 'remember who you really are'
      } else {
         const mpId = this.state.mpId
         let re =  /^\d{9}/
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
         if (this.state.password !== this.state.confirmPassword) {
            passwordError = 'passwords dont match'
         }
      }

      if (sprayNameError || emailError || passwordError || mpIdError) {
         this.setState({ sprayNameError, emailError, passwordError, mpIdError })
         return false
      }
      // console.log('a failed validation has occurred')
      console.log(this.state)
      return true

   }

   renderRedirect = () => {
      if (this.state.redirect) {
         // return <Redirect to='/Login' />
         return <Redirect to={{
            pathname: '/Login',
            state: { redirected: 'Welcome, now log in' }
         }}
         />
      }
   }
   handleChange = (event) => {
      console.log('changed')
      const name = event.target.name
      const value = event.target.value

      this.setState({
         [name]: value,
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      console.log('isValid post '+isValid)
      if (isValid) {
         axios.post(API, {
            sprayName: event.target.sprayName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            mpId: event.target.mpId.value
         })
         .then((response) => {
            console.log('hello im here')
            this.setState({ redirect: true })
         })
         .catch(error => {
            console.log(error.response)
            this.setState({error: error.response.data})
         })
      }
   }

   render() {
      return (
         <IonPage>
            {this.renderRedirect()}
            <IonCard>
               <IonCardHeader> Registration </IonCardHeader>
               <IonCardContent>
                  <form onSubmit={this.handleSubmit}>
                     <IonToast
                        isOpen= {this.state.error !== ''}
                        header= {this.state.error}
                        messge= {this.state.error}
                        onDidDissmiss= {() => {this.setState({ error: '' })}}
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





