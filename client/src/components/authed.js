import React, { Component } from 'react'
import axios from 'axios'

import TickList from './ticklist'
import AddFriend from './addFriend'
import Header from './header'
import ManageFriends from './manageFriends'

import {
   IonToast,
   IonToolbar,
   IonHeader,
   IonIcon,
   IonButtons,
   IonButton,
   IonTitle
} from '@ionic/react'

import {
   person
} from 'ionicons/icons'

const API = 'http://localhost:9000/'
class authed extends Component {
   constructor(props) {
      super(props)
      this.state = {
         toastMessage: '',
         friendsList: [],
         newFriendMpId: 0
      }

      this.defaultState = this.state
      this.showToast = this.showToast.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
      this.handleNewFriend = this.handleNewFriend.bind(this)
      this.getFriends = this.getFriends.bind(this)

   }

   handleNewFriend = (newFriendMpId) => {
      console.log('handling of new friend: ' + newFriendMpId)
      this.setState({
         newFriendMpId: newFriendMpId,
         friendsList: [...this.state.friendsList, newFriendMpId]
      })
   }

   showToast = (message) => {
      this.setState({
         toastMessage: message
      })
   }

   handleDissmiss = () => {
      this.setState(this.defaultState)
   }

   getFriends()  {
      return axios.get(API + 'getFriends', {
         headers: {
            'Authorization': `${this.props.authToken}`
         },
         params: {
            sprayName: `${this.props.sprayName}`
         }
      })
         .then(response => {
            this.setState({
               friendsList: response.data
            })
         })
         .catch(error => {
            console.log(error)
         })
   }

   render() {
      return (
         <div>
            <Header
               logout= {this.props.logout}
            />

            <IonToast
               isOpen= {this.state.toastMessage !== ''}
               header= 'Success'
               message= {this.state.toastMessage}
               buttons= {[
                  {
                     text: 'OK',
                        handler: this.handleDissmiss
                  }
               ]}
            />

            <AddFriend
               showToast= {this.showToast}
               handleNewFriend= {this.handleNewFriend}
               sprayName= {this.props.sprayName}
               authToken= {this.props.authToken}
            />
            <TickList
               newFriendMpId= {this.state.newFriendMpId}
               sprayName= {this.props.sprayName}
               authToken= {this.props.authToken}
               friendsList= {this.state.friendsList}
               getFriends= {this.getFriends}
            />
         </div>
      )
   }
}

export default authed
