import React, { Component } from 'react'
import axios from 'axios'

import {
   IonInput,
   IonButton,
   IonLabel,
   IonModal,
   IonItem
} from '@ionic/react'

import FriendCard from './friendCard'

// gets passed spray_name and token from parent
const API = 'http://localhost:9000/addFriend'

class AddFriend extends Component {
   constructor(props) {
      super(props)
      this.state = {
         mpId: '',
         mpIdError: '',
         apiError: '',
         modalOpen: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.toggleModal = this.toggleModal.bind(this)
   }

   validate = () => {
      let mpIdError = ''

      if (!this.state.mpId) {
         mpIdError = 'please enter a 9 digit mountain project ID'
      } else {
         let re = /^\d{9}/
         if (!re.test(this.state.mpId)) {
            mpIdError = 'please ensure you are only entering a 9 digit mountain project ID'
         }
      }
      if (mpIdError) {
         this.setState({ mpIdError })
         return false
      }
      return true
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
               console.log(error)
               this.setState({ apiError: error })
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
