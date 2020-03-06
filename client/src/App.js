import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';

/* ionic */
import '@ionic/react/css/core.css'
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* components */
import TickList from './components/ticklist'
import Login from './components/login'
import Registration from './components/registration'
import Authed from './components/authed'
import LogRegSlider from './components/logRegSlider'


function App() {

   const isAuthed = useState(false)

   return (
      <IonApp>
         <IonReactRouter>
            <IonRouterOutlet>
               <Route path = '/Registration' exact component={Registration} />
               <Route path = '/Login' exact component={Login} />
               <Route path = '/authed' exact component={Authed} />

               <Route
                  path  = '/'
                  render = { () => {
                        // return isAuthed ? exact component={authed} : exact component={Registration}
                     console.log('isAuthed '+isAuthed)
                     return (isAuthed === true) ? <Authed/> : <LogRegSlider/>
                  }}
               />
               {/* <Route path = '/Ticks' exact component={TickList} /> */}
            </IonRouterOutlet>
         </IonReactRouter>
      </IonApp>
   );
}

export default App;
