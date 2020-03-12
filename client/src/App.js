import React, { Component } from 'react'
import { Route } from 'react-router-dom'

/* ionic */
import '@ionic/react/css/core.css'
import { IonApp, IonRouterOutlet } from '@ionic/react'
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
// import TickList from './components/ticklist'
import Authed from './components/authed'
import LogRegSlider from './components/logRegSlider'
// import AuthUser from './components/AuthUser'

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isAuthed:  '',
         authToken: '',
         sprayName: '',
      }
   }

   componentDidMount() {
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

   render() {
      return (
         <IonApp>
            <IonReactRouter>
               <IonRouterOutlet>
                  <Route
                     path  = '*'
                     render = { () => {
                        console.log('isAuthed '+this.state.isAuthed)
                        return (this.state.isAuthed === true ? <Authed/> : <LogRegSlider/>)
                     }}
                  />
               </IonRouterOutlet>
            </IonReactRouter>
         </IonApp>
      )
   }
}

export default App
