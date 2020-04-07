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

class TickCard extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <IonContent>
            <IonCard>
               <IonImg src={this.props.tick.routeImg} />
               <IonAvatar>
                  <IonIcon
                     name= 'ice-cream-outline'
                  />
               </IonAvatar>
               <IonCardSubtitle  />
                  Route Name:
               <IonCardSubtitle/>
               <IonText>
                  <p> {this.props.tick.routeName} </p>
               </IonText>
               <IonCardSubtitle  />
                  Route Grade:
               <IonCardSubtitle/>
               <IonText>
                  <p> {this.props.tick.routeGrade} </p>
               </IonText>
               <IonCardSubtitle  />
                  Style
               <IonCardSubtitle/>
               <IonText>
                  <p> {this.props.tick.style} </p>
               </IonText>
               <IonCardSubtitle  />
                  Date
               <IonCardSubtitle/>
               <IonText>
                  <p> {this.props.tick.date} </p>
               </IonText>
            </IonCard>
         </IonContent>
      )
   }
}

export default TickCard

