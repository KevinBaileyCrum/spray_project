import React, { Component } from 'react'
import axios from 'axios'
// import Form from 'react-validation/build/form'
// import Input from 'react-validation/build/input'
// import Button from 'react-validation/build/button'
// import Textarea from 'react-validation/build/textarea'
// import Select from 'react-validation/build/select'
import { isEmail } from 'validator'

import {
   IonPage,
   IonItem,
   IonLabel,
   IonInput,
   IonCard,
   IonCardHeader,
   IonCardContent,
   IonAlert
} from '@ionic/react';

const API = 'http://localhost:9000/register' // pass this to component from app?

// const email = (value) => {
//    if (!isEmail(value)) {
//       return <span className="form-error is-visible">{value} is not a valid email.</span>
//    }
// }

// const isEqual = (value, props, components) => {
//    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed
//    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged

//    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
//       return <span className="form-error is-visible">Passwords are not equal.</span>
//    }
// }

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
         emailError: '',
         passwordError: '',
         error: ''
      }
   }

   validate = () => {
      let sprayNameError = ''
      let emailError = ''
      let passwordError = ''

      if (!this.
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid() = this.validate()
      axios.post(API, {
         sprayName: event.target.sprayName.value,
         email: event.target.email.value,
         password: event.target.password.value,
         mpId: event.target.mpId.value
      })
         .catch(error => {
            console.log(error.response)
            this.setState({error: error.response.data})
         });
   }

   render() {
      const { error } = this.state
      return (

         <IonPage>
            <IonCard>
               <IonCardHeader> Registration </IonCardHeader>
               <IonCardContent>
                  {/* <IonContent> */}
                  {/* <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}> */}
                  <form onSubmit={this.handleSubmit}>
                     {/* <span> { error } </span> */}
                     <
                     <IonItem>
                        <IonLabel>
                           Spray Name*
                        </IonLabel>
                        <IonInput
                           required type='text'
                           name='sprayName'
                        />
                     </IonItem>
                     <IonItem>
                        <IonLabel>
                           Mountain Project User Id*
                        </IonLabel>
                        <IonInput
                           required type='text'
                           name='mpId'
                        />
                     </IonItem>
                     <IonItem>
                        <IonLabel>
                           Email*
                        </IonLabel>
                        <IonInput
                           required type='text'
                           name='mpId'
                        />
                     </IonItem>
                     <IonItem>
                        <IonLabel>
                           Password*
                        </IonLabel>
                        <IonInput
                           required type="password"
                           name="password"
                        />
                     </IonItem>
                     <IonItem>
                        <IonLabel>
                           Confirm password*
                        </IonLabel>
                        <IonInput
                           required type="password"
                           name="confirm"
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





