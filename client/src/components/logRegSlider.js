import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

/* ionic */
import {
   IonPage,
   IonCard,
   IonSegment,
   IonSegmentButton,
   IonIcon,
   IonLabel,
   IonToolbar
} from '@ionic/react'

import Login from './login'
import Registration from './registration'

class LogRegSlider extends Component {
   constructor(props) {
      super(props)
      this.state = {
         tab: 'login'
      }

      this.handleChange = this.handleChange.bind(this)
   }

   handleChange = (event) => {
      console.log(event)
      console.log(event.detail.value)
      console.log('pre ' +JSON.stringify(this.state))
      const value = event.detail.value
      this.setState({ tab: value })
      console.log('aff ' +JSON.stringify(this.state))
   }

   render() {
      return (
         <div>
            <div>
               <IonToolbar>
                  <IonSegment onIonChange= {this.handleChange} value= {this.state.tab}>
                     <IonSegmentButton value= 'login'>
                        login
                     </IonSegmentButton>
                     <IonSegmentButton value= 'register'>
                        register
                     </IonSegmentButton>
                  </IonSegment>
               </IonToolbar>
            </div>

            <div>
               {this.state.tab === 'login' ? (<Login/>) : (<Registration/>)}
            </div>
         </div>

      )
   }
}

export default LogRegSlider
