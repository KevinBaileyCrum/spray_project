// TODO: error messages on client for not entering 9 digits
//    error messages for when api returns invalid userid
//
//    show user card
//    confirmation: allow add or dismiss....if i do that ill change logic in endpoint and not
//    update db until confirmation

import React, { Component } from 'react'
import axios from 'axios'

import {
   IonInput,
   IonButton,
   IonLabel,
   IonModal,
   IonItem,
   IonToast
} from '@ionic/react'

import FriendCard from './friendCard'

// gets passed spray_name and token from parent
const API = 'http://localhost:9000/addFriend'

class AddFriend extends Component {
   constructor(props) {
      super(props)
      this.state = {
         mpId: '',
         error: '',
         modalOpen: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.toggleModal = this.toggleModal.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
   }

   validate = () => {
      let error = ''

      if (!this.state.mpId) {
         error = 'please enter a 9 digit mountain project ID'
      } else {
         let re = /^\d{9}/
         if (!re.test(this.state.mpId)) {
            error = 'please ensure you are only entering a 9 digit mountain project ID'
         }
      }
      if (error) {
         this.setState({ error })
         return false
      }
      return true
   }

   handleDissmiss = () => {
      console.log('dismissed')
      this.setState({
         error: ''
      })
   }

   handleChange = (event) => {
      console.log('changed')
      console.log(event)
      this.setState({
         mpId: event.target.value
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      if (isValid) {
         axios.post(API, {
            mpId: this.state.mpId
         })
            .then(response => {

            })
            .catch(error => {
               console.log('im calling error bruh')
               console.log(error)
               this.setState({ error: error.response.data })
            })
      }
      console.log('submitted')
      console.log(event)
   }

   toggleModal = (event) => {
      this.setState({
         modalOpen: !this.state.modalOpen
      })
   }

   render() {
      return (
         <div>
            <IonButton expand='block' onClick={this.toggleModal}> Add Friend </IonButton>
            <IonModal
               isOpen={this.state.modalOpen}
            >
               <IonToast
                  isOpen= {this.state.error !== ''}
                  header= {this.state.error}
                  messge= {this.state.error}
                  // onDidDissmiss= {() => {this.setState({ error: '' })}}
                  buttons={[
                     {
                        text:'OK',
                        handler: this.handleDissmiss
                     }
                  ]}
               />
               <p>
                  Please enter a 9 digit Mountain Project Id of someone who's ticks you would like to follow
                  eg(https://www.mountainproject.com/user/<strong>108543839</strong>/)
               </p>
               <form onSubmit={this.handleSubmit}>
                  <IonItem>
                     <IonLabel Mountain Project Id />
                     <IonInput
                        type= 'number'
                        name= 'mpId'
                        value={this.state.mpId}
                        onIonChange={this.handleChange}
                        clearOnEdit={true}
                     />
                     <IonButton type='submit'> Submit </IonButton>
                     <IonButton onClick={this.toggleModal}> Cancel </IonButton>
                  </IonItem>
               </form>


            </IonModal>
            <FriendCard />
         </div>
      )
   }
}

export default AddFriend
