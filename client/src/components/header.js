import React, { Component } from 'react'

import {
   IonToolbar,
   IonHeader,
   IonIcon,
   IonTitle,
   IonButtons,
   IonButton
} from '@ionic/react'

import {
   person
} from 'ionicons/icons'

class Header extends Component {
   render(){
      return(
         <div>
            <IonHeader>
               <IonToolbar>
                  <IonIcon
                     icon={person}
                     slot='start'
                  />
                  <IonTitle>
                     {/* {this.props.sprayName} */}
                     title
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
         </div>

      )
   }
}

export default Header
