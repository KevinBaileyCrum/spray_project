import React, { Component } from 'react'

import {
   IonContent,
   IonCard,
   IonCardContent,
   IonCardSubtitle,
   IonAvatar,
   IonImg,
   IonIcon,
   IonText
} from '@ionic/react'

import {
   happy
} from 'ionicons/icons'

class TickCard extends Component {

   render() {
      return (
         this.props.tick.routeName
      )
   }
}

export default TickCard

