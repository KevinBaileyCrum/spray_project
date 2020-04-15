import React, { Component } from 'react'

/* ionic */
import {
   IonSegment,
   IonSegmentButton,
   IonToolbar,
   IonToast,
   IonContent
} from '@ionic/react'

import Login from './login'
import Registration from './registration'

class LogRegSlider extends Component {
   constructor(props) {
      super(props)
      this.state = {
         tab: 'login',
         redirected: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.onRedirect= this.onRedirect.bind(this)
   }

   handleChange = (event) => {
      const value = event.detail.value
      this.setState({ tab: value })
   }

   onRedirect = () => {
      this.setState({
         redirected: true,
         tab: 'login'
      })
   }

   render() {
      return (
         <div>
            <div>

               <IonToast
                  isOpen= {this.state.redirected === true}
                  header= {'Welcome, you may now log in'}
                  onDidDissmiss= {() => {this.setState({ redirected: false })}}
                  buttons={['OK']}
               />

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
               {this.state.tab === 'login' ?
                  (<Login
                     loginUpdate={this.props.loginUpdate}
                  />)
               :
                  (<Registration
                     onRedirectProp={this.onRedirect}
                  />)
               }
            </div>
         </div>

      )
   }
}

export default LogRegSlider
