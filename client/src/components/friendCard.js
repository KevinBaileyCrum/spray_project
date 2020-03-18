import React, { Component } from 'react'
import axios from 'axios'

import {
   IonCard,
   IonCardHeader,
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
                  <IonImg src='https://www.mountainproject.com/photos/avatars/108543839.jpg?1573274398' />
               </IonAvatar>
               <IonCardHeader>
                  Kevin Crum
               </IonCardHeader>
               <IonCardHeader>
                  Location
               </IonCardHeader>
         </IonCard>

      )
   }
}

export default FriendCard
