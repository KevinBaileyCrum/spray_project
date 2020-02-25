import React from 'react'
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
import TickList from './components/ticklist/ticklist'
import Login from './components/login/login'
import Registration from './components/registration/registration'

function App() {
   return (
      <IonApp>
         <IonReactRouter>
            <IonRouterOutlet>
               <Route path = '/Registration' exact component={Registration} />
               <Route path = '/Login' exact component={Login} />
            </IonRouterOutlet>
         </IonReactRouter>
      </IonApp>
   );
}

export default App;
