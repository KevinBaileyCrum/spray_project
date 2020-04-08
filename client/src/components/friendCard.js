import React, { Component } from 'react'

import {
   IonCard,
   IonCardHeader,
   IonCardContent,
   IonAvatar,
   IonImg,
   IonButton
} from '@ionic/react'

class FriendCard extends Component {

   render() {
      return (
         <IonCard>
               <IonAvatar>
                  {/* <IonImg src='https://www.mountainproject.com/photos/avatars/108543839.jpg?1573274398' /> */}
                  <IonImg src={this.props.friendObj.avatar} />
               </IonAvatar>
               <IonCardHeader>
                  {this.props.friendObj.name}
               </IonCardHeader>
               <IonCardHeader>
                  {/* Location */}
                  {this.props.friendObj.location}
               </IonCardHeader>
               <IonCardContent>
                  {this.props.friendObj.about}
               </IonCardContent>
               <IonButton
                  color='danger'
                  onClick={this.props.modalOff}
               >
                  cancel
               </IonButton>
               <IonButton
                  onClick={this.props.handleAddFriend}
               >
                  add
               </IonButton>
         </IonCard>

      )
   }
}

export default FriendCard
