import React, { Component } from 'react'

import {
   IonContent,
   IonCard,
   IonCardContent,
   IonCardTitle,
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
         <IonCard>

            <IonImg src={this.props.tick.routeImg} />
            <IonAvatar>
               <IonImg src={this.props.tick.userImg} />
            </IonAvatar>
            <IonText>
               {this.props.tick.userName}
            </IonText>
            <IonCardTitle>
               {this.props.tick.routeName} : {this.props.tick.routeGrade}
            </IonCardTitle>

            <IonCardSubtitle>
               Route Style:
            </IonCardSubtitle>
            <p> {this.props.tick.style} </p>

            <IonCardSubtitle>
               Route Date:
            </IonCardSubtitle>
            <p> {this.props.tick.date} </p>

         </IonCard>
      )
   }
}

export default TickCard

