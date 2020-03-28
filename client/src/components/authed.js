import React, { Component } from 'react'

import TickList from './ticklist'
import AddFriend from './addFriend'

import {
   IonToast
} from '@ionic/react'

class authed extends Component {
   constructor(props) {
      super(props)
      this.state = {
         toastMessage: ''
      }

      this.defaultState = this.state
      this.showToast = this.showToast.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
   }

   showToast = (message) => {
      this.setState({
         toastMessage: message
      })
   }

   handleDissmiss = () => {
      this.setState(this.defaultState)
   }

   render() {
      return (
         <div>
            <IonToast
               isOpen= {this.state.toastMessage !== ''}
               header= 'Success'
               message= {this.state.toastMessage}
               buttons= {[
                  {
                     text: 'OK',
                     handler: this.handleDissmiss
                  }
               ]}
            />

            <p> hello {this.props.sprayName} </p>
            {/* <TickList */}
            {/*    sprayName={this.props.sprayName} */}
            {/*    authToken={this.props.authToken} */}
            {/* /> */}
            <AddFriend
               showToast= {this.showToast}
            />
         </div>
      )
   }
}

export default authed
