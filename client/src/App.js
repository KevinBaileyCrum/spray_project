import React, { Component } from 'react'
import { Route } from 'react-router-dom'

/* ionic */
import '@ionic/react/css/core.css'
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* components */
import Authed from './components/authed'
import LogRegSlider from './components/logRegSlider'

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isAuthed:  '',
         authToken: '',
         sprayName: '',
      }
      this.defaultState = this.state
      this.loginUpdate = this.loginUpdate.bind(this)
      this.logout = this.logout.bind(this)
   }

   componentDidMount() {
      this.loginUpdate()
   }

   loginUpdate() {
      const token = localStorage.getItem('authToken')
      const name = localStorage.getItem('sprayName')
      if (!token || !name) {
         this.setState({
            isAuthed: false,
            authToken: '',
            sprayName: ''
         })
         localStorage.clear()
      } else {
         this.setState({
            isAuthed: true,
            authToken: token,
            sprayName: name,
         })
      }
   }

   jwtExpireHandler() {
      localStorage.clear()
   }

   logout() {
      localStorage.clear()
      this.setState(this.defaultState)
      console.log('logout clicked')
      window.location.reload(false)
   }


   render() {
      return (
         <IonApp>
            <IonReactRouter>
               <IonRouterOutlet>
                  <IonContent>
                     <Route
                        path  = '*'
                        render = { () => {
                           console.log('isAuthed '+this.state.isAuthed)
                           return (this.state.isAuthed === true ?
                              <Authed
                                 authToken={this.state.authToken}
                                 sprayName={this.state.sprayName}
                                 loginUpdate={this.loginUpdate}
                                 jwtExpireHandler={this.jwtExpireHandler}
                                 logout={this.logout}
                              />
                              :
                              <LogRegSlider
                                 loginUpdate={this.loginUpdate}
                              />)
                        }}
                     />
                  </IonContent>
               </IonRouterOutlet>
            </IonReactRouter>
         </IonApp>
      )
   }
}

export default App
