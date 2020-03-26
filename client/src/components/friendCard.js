import React, { Component } from 'react'
import axios from 'axios'

import {
   IonCard,
   IonCardHeader,
   IonCardContent,
   IonAvatar,
   IonImg,
   IonItem
} from '@ionic/react'

class FriendCard extends Component {
   constructor(props) {
      super(props)
      this.state = {
      }
   }

   render() {
      return (
         <IonCard>
               <IonAvatar>
                  {/* <IonImg src='https://www.mountainproject.com/photos/avatars/108543839.jpg?1573274398' /> */}
                  <IonImg src={this.props.friendObj.avatar} />
               </IonAvatar>
               <IonCardHeader>
                  {/* Kevin Crum */}
                  {this.props.friendObj.name}
               </IonCardHeader>
               <IonCardHeader>
                  {/* Location */}
                  {this.props.friendObj.location}
               </IonCardHeader>
               <IonCardContent>
                  {this.props.friendObj.about}
               </IonCardContent>
         </IonCard>

      )
   }
}

export default FriendCard
