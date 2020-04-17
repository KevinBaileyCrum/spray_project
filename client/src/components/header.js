import React, { Component } from 'react'

import {
   IonToolbar,
   IonHeader,
   IonIcon,
   IonTitle,
   IonButtons,
   IonButton,
   IonPopover,
   IonList,
   IonItem,
   IonLabel
} from '@ionic/react'

import {
   person,
   chevronDown
} from 'ionicons/icons'

class Header extends Component {
   constructor(props) {
      super(props)
      this.state = {
         showPopover: false
      }
      this.togglePopover = this.togglePopover.bind(this)
      this.defaultState = this.state
   }

   togglePopover = () => {
      this.setState({
         showPopover: !this.state.showPopover
      })
   }

   render(){
      return(
         <div>
            <IonHeader>
               <IonToolbar>
                  <IonTitle>
                     Spray Project
                  </IonTitle>
                  <IonButtons
                     slot='end'
                  >
                     <IonButton
                        onClick={this.togglePopover}
                     >
                        {this.props.sprayName}
                        <IonIcon icon={chevronDown} />
                     </IonButton>
                  </IonButtons>
               </IonToolbar>
            </IonHeader>

            <IonPopover
               isOpen= {this.state.showPopover}
               onDidDismiss= {this.togglePopover}
            >
               <IonList>
                  <IonItem>
                     <IonLabel>
                        Manage Friends
                     </IonLabel>
                  </IonItem>
                  <IonItem>
                     <IonButton
                        onClick={this.props.logout}
                     >
                        Logout
                     </IonButton>
                  </IonItem>
               </IonList>
            </IonPopover>
         </div>
      )
   }
}

export default Header
