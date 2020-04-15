import React, { Component } from 'react'

import TickList from './ticklist'
import AddFriend from './addFriend'

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

class authed extends Component {
   constructor(props) {
      super(props)
      this.state = {
         toastMessage: '',
         newFriendMpId: 0
      }

      this.defaultState = this.state
      this.showToast = this.showToast.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
      this.handleNewFriend = this.handleNewFriend.bind(this)

   }

   handleNewFriend = (newFriendMpId) => {
      console.log('handling of new friend: ' + newFriendMpId)
      this.setState({
         newFriendMpId: newFriendMpId
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

   render() {
      return (
         <div>
            <IonHeader>
               <IonToolbar>
                  <IonIcon
                     icon={person}
                     slot='start'
                  />
                  <IonTitle>
                     {this.props.sprayName}
                  </IonTitle>
                  <IonButtons
                     slot='end'
                  >
                     <IonButton
                        onClick={this.props.logout}
                     >
                        Logout
                     </IonButton>
                  </IonButtons>
               </IonToolbar>
            </IonHeader>

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
            />
         </div>
      )
   }
}

export default authed
