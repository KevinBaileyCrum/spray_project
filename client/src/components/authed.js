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
         toastMessage: '',
         updatedInteger: 0
      }

      this.defaultState = this.state
      this.showToast = this.showToast.bind(this)
      this.handleDissmiss = this.handleDissmiss.bind(this)
      this.isUpdated = this.isUpdated.bind(this)

   }

   isUpdated = () => {
      this.setState({
         updatedInteger: ++this.state.updatedInteger
      })
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
            <AddFriend
               showToast= {this.showToast}
               isUpdated= {this.isUpdated}
               sprayName= {this.props.sprayName}
               authToken= {this.props.authToken}
            />
            <TickList
               updatedInteger= {this.state.updatedInteger}
               sprayName= {this.props.sprayName}
               authToken= {this.props.authToken}
            />
         </div>
      )
   }
}

export default authed
