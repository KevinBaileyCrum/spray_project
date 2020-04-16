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
         modalOpen: false,
         showFriend: false,
         friendObj: {
            mpId: '',
            name: '',
            avatar: '',
            location: '',
            about: ''
         }
      }
      this.defaultState = this.state

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.modalOn = this.modalOn.bind(this)
      this.modalOff = this.modalOff.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
      this.handleAddFriend = this.handleAddFriend.bind(this)

   }

   componentWillUnmount() {
      console.log('i have dismounted')
      this.setState(this.defaultState)
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
         axios.get(API, {
            headers: {
               'Authorization': `${this.props.authToken}`
            },
            params: {
               mpId: this.state.mpId
            }
         })
            .then(response => {
               console.log(response.data)
               const data = response.data
               this.setState({
                  showFriend: true,
                  friendObj: {
                     mpId: data.id,
                     name: data.name,
                     avatar: data.avatar,
                     location: data.location,
                     about: data.about
                  }
               })
               console.log(this.state)
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

   handleAddFriend = () => {
      axios.post(API, null,{
         headers: {
            'Authorization': `${this.props.authToken}`
         },
         params: {
            mpId: this.state.mpId,
            sprayName: this.props.sprayName
         }
      })
         .then(response => {
            const message = this.state.friendObj.name + ' has been added to your friends list!'
            this.props.showToast(message)
            this.props.handleNewFriend(this.state.mpId)
            this.setState(this.defaultState)
         })
         .catch(error => {
            console.log('error on post')
            console.log(error)
         })
   }

   modalOn = () => {
      this.setState({
         modalOpen: true
      })
   }

   modalOff = () => {
      this.setState(
         this.defaultState
      )
   }

   render() {
      let friendCard = null
      if (this.state.showFriend) {
         friendCard =
            <FriendCard
               friendObj= {this.state.friendObj}
               modalOff= {this.modalOff}
               handleAddFriend= {this.handleAddFriend}
            />
      }
      return (
         <div>
            <IonButton expand='block' onClick={this.modalOn}> Add Friend </IonButton>
            <IonModal
               isOpen={this.state.modalOpen}
               onDidDismiss={this.modalOff}
            >
               <IonToast
                  isOpen= {this.state.error !== ''}
                  header= {this.state.error}
                  messge= {this.state.error}
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
                     <IonButton onClick={this.modalOff}> Cancel </IonButton>
                  </IonItem>
               </form>
               { friendCard }
            </IonModal>

         </div>
      )
   }
}

export default AddFriend
