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
      this.handleDissmiss = this.handleDissmiss.bind(this)
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
      return true

   }

   handleDissmiss = () => {
      this.setState({
         error: ''
      })
   }

   renderRedirect = () => {
      this.props.onRedirectProp()
   }

   handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value

      this.setState({
         [name]: value,
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      if (isValid) {
         axios.post(API, {
            sprayName: event.target.sprayName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            mpId: event.target.mpId.value
         })
         .then((response) => {
            this.renderRedirect()
         })
         .catch(error => {
            console.log(error)
            console.log(error.response)
            this.setState({error: error.response.data})
         })
      }
   }

   render() {
      return (
            <IonCard>
               <IonCardContent>
                  <form onSubmit={this.handleSubmit}>
                     <IonToast
                        isOpen= {this.state.error !== ''}
                        header= {this.state.error}
                        messge= {this.state.error}
                        onDidDissmiss= {() => {this.setState({ error: '' })}}
                        buttons={[
                           {
                              text:'OK',
                              handler: this.handleDissmiss
                           }
                        ]}
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
                     <IonButton type='submit'>Submit</IonButton>
                  </form>
               </IonCardContent>
            </IonCard>
      )
   }
}

export default Registration





